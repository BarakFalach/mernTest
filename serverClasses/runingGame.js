const User = require("./user");
const GAME_KEY_SUCCESS = "GAME_KEY_SUCCESS";
const PHASE = "PHASE";
const USER = "USER";
const converter = require("json-2-csv");
const { json } = require("express");
const { Socket } = require("dgram");
const { runInThisContext } = require("vm");
const Controller = require("./controller");
fs = require("fs");

class RuningGame {
  constructor(
    admin,
    gameType,
    numOfParticipates,
    phaseList,
    gameDefenition,
    gameKey
  ) {
    this.admin = admin;
    this.gameKey = gameKey;
    this.gameStarted = false;
    this.game_type = gameType; //TODO:: what is gameType
    this.phaseList = phaseList;
    this.gameDefenition = gameDefenition;
    this.nextPhase = 0;
    this.showGroups = false;
    this.showGroupScore = true;
    this.groups = {
      1: {
        participants: 0,
        curr_score: 0,
      },
      2: {
        participants: 0,
        curr_score: 0,
      },
    };
    this.d_users = {};
    this.archive_user_dict = {};
    this.d_users_answers = [];
    this.knowledge_question_answers = {};
    this.knowledge_question_dist = {};
    this.general_questions_answers = {};
    this.num_of_participates = numOfParticipates;
    this.curr_connected_users = 0;
    this.curr_right_answer;
    this.user_semaphore = 0;
    this.curr_phase = {};
    this.pause = false;
    this.gameResult = [];
    this.numberStack = 1;
    this.controller = new Controller();
    this.winners = [];
    this.questionCounter = 1;
  }

  /** This function change the next group num
   *  return: The new group number
   */
  getGroupNum() {
    let key = Object.keys(this.groups).reduce((key, v) =>
      this.groups[v].participants < this.groups[key].participants ? v : key
    );
    return key;
  }

  /**
   *  @update - User, clean answers field for connected and archive users
   *  @write - write the result for the csv
   */
  cleanUsersLastAnswer(questionPhase) {
    for (var item in this.d_users) {
      this.d_users[item].last_answer_correctness = false;
      this.d_users[item].last_answer = 0;
    }
    for (var item in this.archive_user_dict) {
      this.archive_user_dict[item].last_answer_correctness = false;
      this.archive_user_dict[item].last_answer = 0;
    }
    this.d_users_answers = [];
  }

  /** this function sum the values of a given dict */
  sumValues(obj) {
    return Object.values(obj).reduce((a, b) => a + b);
  }

  /** This function clean the last_answer_correctness to all game's users to false
   * @update dicts: knowledge_question_answers
   * @update User : last_asnwer, last_time, curr_score
   * @update Group : Group Score.
   *  return: null
   */
  updateScoreForUsers(questionPhase) {
    var user = {};
    for (var index in this.d_users) {
      user = this.d_users[index];
      user.last_answer !== 0
        ? (this.knowledge_question_answers[user.last_answer] += 1)
        : "";
      if (user.last_answer == questionPhase.correct_answer) {
        user.curr_score += Math.round(user.last_time / 10);
        user.last_answer_correctness = true;
        this.updateScoreForGroup(user.group, Math.round(user.last_time / 10));
      } else {
        user.last_answer_correctness = false;
      }
    }
  }

  /** This function update the group total score with the given score
   *  return: null
   */
  updateScoreForGroup(group, score) {
    if (this.groups[group].participants !== 0) {
      this.groups[group].curr_score += Math.round(
        score / this.groups[group].participants
      );
    }
  }

  /** this function create json object that contatins the users Data.
   *
   */
  usersToJson() {
    var json_builder = {};
    for (key in this.d_users) {
      json_builder[key] = this.d_users[key].toJSON();
    }
    return json_builder;
  }

  /**this function create an User object and add it to the game, after the game Key Auth.
   * @param {*} userID
   * @param {*} userName
   * @param {*} connection - the webScoket connection of this user
   * @param {*} gameKey
   */
  handle_req_user_login(userID, connection, gameKey) {
    const phase = this.gameStarted ? "welcome" : "webCam";
    this.curr_connected_users++;
    const phaseProp = this.gameStarted
      ? { ratio: this.curr_connected_users / this.num_of_participates }
      : { flag: false };
    const curUser = new User(gameKey, this.getGroupNum(), this.numberStack);
    this.numberStack++;
    curUser.setConnection(connection);
    this.d_users[userID] = curUser;
    this.groups[curUser.group].participants++;

    connection.send(
      JSON.stringify({
        type: GAME_KEY_SUCCESS,
        id: userID,
        name: curUser.userNumber,
        score: curUser.curr_score,
        gameKey: gameKey, //TODO:::  change this veriable in client
        group: this.showGroups ? curUser.group : 0,
        phase: phase,
        phaseProp: phaseProp,
      })
    );

    // update users connecting

    // update the admin on the number of users that get in
    if (!this.gameStarted) this.sendProgressBar();
    this.sendUserTable();
  }

  /**
   * reset arguments before question phase load
   * bars lock, knowloedge_question_answers, knowloedge_question_dist
   */
  clean_arguments_for_question() {
    this.cleanUsersLastAnswer();
    const cur_answers_dict = {};
    const len = this.curr_phase.phaseProp.answers.length;
    for (var i = 0; i < len; i++) {
      cur_answers_dict[i + 1] = 0;
    }
    this.barsMutex = true;
    this.knowledge_question_answers = cur_answers_dict;
    this.knowledge_question_dist = cur_answers_dict;
  }

  /** time the next phase to be loaded to the uswers */
  handle_change_screen(phaseName = null) {
    if (phaseName == null) {
      if (this.curr_phase.type === "question") {
        this.updateScoreForUsers(this.curr_phase);
        this.pushToResult();
      }
      this.curr_phase = this.gameDefenition[this.phaseList[this.nextPhase]];
      phaseName = this.curr_phase.phaseProp.key;
    } else {
      this.curr_phase = this.gameDefenition[phaseName];
    }
    if (this.curr_phase.phaseProp.key === "174") this.showGroupScore = false;
    if (this.curr_phase.type == "question") {
      this.clean_arguments_for_question();
    }
    if (this.curr_phase.type == "bars") {
      const questionPhase = this.gameDefenition[this.curr_phase.questionKey];
      this.send_bars(questionPhase);
    } else if (this.curr_phase.type == "top3") {
      this.top3Users();
    } else if (this.curr_phase.type == "groups") this.topGroups();
    else if (this.curr_phase.type === "goodBye") this.goodBye();
    else {
      for (key in this.d_users) {
        this.d_users[key].connection.send(
          JSON.stringify({
            type: PHASE,
            phase: this.curr_phase.type,
            phaseProp: this.curr_phase.phaseProp,
            score: this.d_users[key].curr_score,
            group: this.showGroups ? this.d_users[key].group : 0,
            groupOne: this.showGroupScore ? this.groups[1].curr_score : 0,
            groupTwo: this.showGroupScore ? this.groups[2].curr_score : 0,
          })
        );
      }
    }
    if (phaseName == "goodbye") {
      this.writeResultCsv();
      //TODO:: handle end Game
      this.setPause();
    }
    this.nextPhase = this.phaseList.indexOf(phaseName) + 1;
    this.sendPhaseStatus();
  }
  /** This function update the user answer and score
   *  @updated dicts: User last_asnwer, last_time
   *  @return: if all users answerd (or time is over) send to all users if they right (true) and the updated score
   */
  handle_user_answer(userID, answer, time, key) {
    if (key != this.curr_phase.phaseProp.key) return;
    if (key == "57") this.groupQuestion(userID, answer);
    if (time <= 0) time = 0;
    this.d_users[userID].last_answer = answer;
    this.d_users[userID].last_time = time;
  }

  handle_user_img(userID, img) {
    this.d_users[userID].webCam = true;
    if (img != "") this.d_users[userID].img = img;
    this.d_users[userID].connection.send(
      JSON.stringify({
        type: PHASE,
        phase: "welcome",
        phaseProp: {
          ratio: this.curr_connected_users / this.num_of_participates,
        },
        score: this.d_users[key].curr_score,
        groupOne: this.showGroupScore ? this.groups[1].curr_score : 0,
        groupTwo: this.showGroupScore ? this.groups[2].curr_score : 0,
      })
    );
  }

  send_bars() {
    const questionPhase = this.gameDefenition[this.curr_phase.questionKey];
    // this.updateScoreForUsers(questionPhase);

    for (key in this.d_users) {
      this.d_users[key].connection.send(
        JSON.stringify({
          type: PHASE,
          phase: "bars",
          phaseProp: {
            distribution: this.knowledge_question_dist,
            correctAnswer: questionPhase.correct_answer,
            correctTerm: this.curr_phase.phaseProp.knowledge
              ? questionPhase.phaseProp.answers[
                  questionPhase.correct_answer - 1
                ]
              : "",
            userAnswer: this.d_users[key].last_answer,
            key: this.curr_phase.phaseProp.key,
            knowledge: this.curr_phase.phaseProp.knowledge,
          },
          score: this.d_users[key].curr_score,
          groupOne: this.showGroupScore ? this.groups[1].curr_score : 0,
          groupTwo: this.showGroupScore ? this.groups[2].curr_score : 0,
        })
      );
    }
    this.sendUserTable();
    // this.cleanUsersLastAnswer(questionPhase);
  }

  /** This function delete the user from server (and his connections) and remove it to the archive dict
   * @updated dict: d_users, curr_connected_users, diconnected user
   * @call send_bars for handle exit inside a question Phase
   * @return: null
   */
  handle_delete_user(userID, gameKey) {
    try {
      const groupNumber = this.d_users[userID].group;
      this.d_users[userID].setConnection();
      this.groups[groupNumber].participants--;
      this.archive_user_dict[userID] = this.d_users[userID];
      delete this.d_users[userID];

      this.curr_connected_users--;
      this.sendUserTable();
      console.log("SERVER : Player conenction closed (userID: " + userID + ")");

      // TODO: Redirect the user to another page (like loginUser/home)

      // log_game_status(gameKey);
    } catch (err) {
      console.log("problem in handle_delete_user failed");
    }
  }

  /** This function sort the users or groups dictionaries by score
   *  @param {which to sort, users or group} usersOrGroups
   *  @return: Array of the sorted users
   */
  sortByScore() {
    var usersAsArr = [];
    for (var user in this.d_users) {
      usersAsArr.push(this.d_users[user]);
    }

    usersAsArr.sort(function (first, second) {
      return second.curr_score - first.curr_score;
    });
    return usersAsArr;
  }

  /** This function check who is the winning group at this point
   *  @return: The currently winning group
   */
  currentWinningGroup() {
    const groups = sortByScore("groups");
    return groups[0];
  }

  /** This function get the top 3 users by score
   *  @return: array of 3 top users by score
   */
  top3Users() {
    const usersByScore = this.sortByScore();
    const topUsers = this.userJsonTop3(usersByScore);
    for (key in this.d_users) {
      this.d_users[key].connection.send(
        JSON.stringify({
          type: PHASE,
          phase: "top3",
          phaseProp: {
            users: topUsers,
            key: this.curr_phase.phaseProp.key,
          },
          score: this.d_users[key].curr_score,
          groupOne: this.showGroupScore ? this.groups[1].curr_score : 0,
          groupTwo: this.showGroupScore ? this.groups[2].curr_score : 0,
        })
      );
    }
    for (var index in topUsers) {
      this.winners[index] = topUsers[index].userNumber;
    }
  }
  /**
   * @param {Array[User]} topUsers - 3 top users in arr
   * @returns {Array[Json]} - return the same arr as json object for the top3 phaseProp.
   */
  userJsonTop3(topUsers) {
    topUsers = topUsers.slice(0, 3);
    const users = [];
    for (key in topUsers) {
      users.push(topUsers[key].topToJSON());
    }
    return users;
  }
  topGroups() {
    this.groups[1].curr_score = Math.round(this.groups[1].curr_score);
    this.groups[2].curr_score = Math.round(this.groups[2].curr_score);
    for (key in this.d_users) {
      this.d_users[key].connection.send(
        JSON.stringify({
          type: PHASE,
          phase: "groups",
          phaseProp: {
            groups: this.groups,
            term: this.curr_phase.phaseProp.term,
            key: this.curr_phase.phaseProp.key,
          },
          score: this.d_users[key].curr_score,
          groupOne: this.showGroupScore ? this.groups[1].curr_score : 0,
          groupTwo: this.showGroupScore ? this.groups[2].curr_score : 0,
        })
      );
    }
  }

  setPause() {
    this.pause = true;
    this.controller.clear();
  }
  setResume() {
    this.pause = false;
    this.scheduler();
  }
  sendUserTable() {
    this.admin.connection.send(
      JSON.stringify({
        type: USER,
        usersData: this.usersToJson(),
      })
    );
  }
  sendProgressBar() {
    for (key in this.d_users) {
      if (this.d_users[key].webCam) {
        this.d_users[key].connection.send(
          JSON.stringify({
            type: PHASE,
            phase: "welcome",
            phaseProp: {
              ratio: this.curr_connected_users / this.num_of_participates,
            },
            score: this.d_users[key].curr_score,
            groupOne: this.showGroupScore ? this.groups[1].curr_score : 0,
            groupTwo: this.showGroupScore ? this.groups[2].curr_score : 0,
          })
        );
      }
    }
  }
  sendPhaseStatus() {
    this.admin.connection.send(
      JSON.stringify({
        type: PHASE,
        phaseIndex: this.nextPhase - 1,
      })
    );
  }

  /**
   * @param {Json} user_dic - Json data structure to find user by name in it.
   * @param {string} name - user name to search
   * @returns {string} return the user id object or undifined if false
   */
  findUserByNumber(user_dic, _nmber) {
    var curUser;
    for (var user in user_dic) {
      if (user_dic[user] != undefined) {
        if (user_dic[user].userNumber == _nmber) {
          curUser = user;
          break;
        }
      }
    }
    return curUser;
  }
  /**
   * find if the user appears in the arcive, create user, send user to default screen, send admin info.
   * @param {String} userID - the user id
   * @param {Number} userNumber - the user number from the local user storgae
   * @param {Socket} connection - the new user connection
   * @retrn void
   */
  handle_user_reconnect(userID, connection, userNumber, gameKey) {
    //TODO:: mvoe to number production and dev
    const fatchedUser = this.findUserByNumber(
      this.archive_user_dict,
      userNumber
    );
    if (fatchedUser) {
      const curUser = this.archive_user_dict[fatchedUser];
      this.d_users[userID] = curUser;
      this.d_users[userID].setConnection(connection);
      delete this.archive_user_dict[fatchedUser];
      this.curr_connected_users++;
      this.groups[curUser.group].participants++;
      connection.send(
        JSON.stringify({
          type: GAME_KEY_SUCCESS,
          id: userID,
          name: curUser.userNumber,
          score: curUser.curr_score,
          gameKey: gameKey,
          group: this.showGroups ? curUser.group : 0,
          phase: "reconnect",
          phaseProp: {},
        })
      );
      this.sendUserTable();
    }
  }
  writeResultCsv() {
    converter.json2csv(this.gameResult, (err, csv) => {
      if (err) {
        throw err;
      }

      // write CSV to a file
      fs.writeFileSync(this.gameKey + ".csv", csv);
    });
  }
  admin_re_enter() {
    this.sendUserTable();
    this.sendPhaseStatus();
  }
  startGame() {
    this.controller.runingGame = this;
    this.gameStarted = true;
    for (key in this.d_users) {
      if (!this.d_users[key].webCam) {
        this.d_users[key].connection.send(
          JSON.stringify({
            type: PHASE,
            phase: "webCam",
            phaseProp: {
              flag: true,
            },
            score: this.d_users[key].curr_score,
            groupOne: this.showGroupScore ? this.groups[1].curr_score : 0,
            groupTwo: this.showGroupScore ? this.groups[2].curr_score : 0,
          })
        );
      }
    }
    this.controller.changePhase(5);
  }
  scheduler(phaseName) {
    if (this.pause) return;
    this.handle_change_screen(phaseName);
    if (phaseName == "goodbye") {
      this.controller.clear();
      return;
    }
    this.controller.changePhase(this.curr_phase.duration);
  }
  endGame() {
    this.scheduler("goodbye");
  }
  groupQuestion(userID, answer) {
    this.showGroups = true;
    this.groups[this.d_users[userID].group].participants--;
    this.d_users[userID].group = answer;
    this.groups[answer].participants++;
  }
  goodBye() {
    var winner;
    console.log(this.winners);
    for (key in this.d_users) {
      if (this.winners.indexOf(this.d_users[key].userNumber) > -1)
        winner = true;
      console.log(winner);
      this.d_users[key].connection.send(
        JSON.stringify({
          type: PHASE,
          phase: this.curr_phase.type,
          phaseProp: { key: this.curr_phase.phaseProp.key, winner: winner },
          score: this.d_users[key].curr_score,
          group: this.showGroups ? this.d_users[key].group : 0,
          groupOne: this.showGroupScore ? this.groups[1].curr_score : 0,
          groupTwo: this.showGroupScore ? this.groups[2].curr_score : 0,
        })
      );
      winner = false;
    }
  }
  pushToResult() {
    this.knowledge_question_dist[0] =
      this.curr_connected_users - this.sumValues(this.knowledge_question_dist);
    const curQuestionDist = {
      questionName: this.questionCounter,
      distrebution: this.knowledge_question_dist,
    };
    this.questionCounter++;
    this.gameResult.push(curQuestionDist);
  }
}
module.exports = RuningGame;
