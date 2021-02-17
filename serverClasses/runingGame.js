const User = require("./user");
const Admin = require("./admin");
const GAME_KEY_SUCCESS = "GAME_KEY_SUCCESS";
const PHASE = "PHASE";
const USER = "USER";
const converter = require("json-2-csv");
fs = require("fs");

class RuningGame {
  constructor(admin, gameType, numOfParticipates, phaseList, gameDefenition) {
    this.admin = admin;
    this.gameStarted = false;
    this.game_type = gameType; //TODO:: what is gameType
    this.phaseList = phaseList;
    this.gameDefenition = gameDefenition;
    this.nextPhase = 0;
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
    this.numberStack = [];
    this.timer;
    for (var i = 30; i > 0; i--) {
      this.numberStack.push(i);
    }
  }

  /** This function change the next group num
   *  return: The new group number
   */
  getGroupNum() {
    let key = Object.keys(this.groups).reduce((key, v) =>
      this.groups[v].participants < this.groups[key].participants ? v : key
    );
    console.log(key);
    return key;
  }

  /**
   *  change last_answer_corecntess to false
   *  add current distrebution to gameResult
   */
  cleanUsersLastAnswer(questionPhase) {
    for (var item in this.d_users) {
      this.d_users[item].last_answer_correctness = false;
    }
    this.d_users_answers = [];
    this.knowledge_question_dist[0] =
      this.curr_connected_users - this.sumValues(this.knowledge_question_dist);
    const curQuestionDist = {
      questionName: questionPhase.key,
      distrebution: this.knowledge_question_dist,
    };
    this.gameResult.push(curQuestionDist);
  }

  /** this function sum the values of a given dict */
  sumValues(obj) {
    return Object.values(obj).reduce((a, b) => a + b);
  }

  /** This function clean the last_answer_correctness to all game's users to false
   *  update dicts: d_users_answers - clean, d_users- clean last_answer_correctness
   *  return: null
   */
  updateScoreForUsers(questionPhase) {
    var user = {};
    const timeInMs = questionPhase.phaseProp.time * 1000;
    for (var index in this.d_users_answers) {
      user = this.d_users_answers[index];
      this.knowledge_question_answers[user.answer] += 1;
      if (user.answer == questionPhase.correct_answer) {
        this.d_users[user.userID].curr_score += Math.round(
          (timeInMs - user.time) / 10
        );
        this.d_users[user.userID].last_answer_correctness = true;
        this.updateScoreForGroup(
          this.d_users[user.userID].group,
          Math.round((timeInMs - user.time) / 10)
        );
      } else {
        this.d_users[user.userID].last_answer_correctness = false;
      }
    }
  }

  /** This function update the group total score with the given score
   *  return: null
   */
  updateScoreForGroup(group, score) {
    console.log(group);
    this.groups[group].curr_score += score;
  }

  /** this function create json object that contatins the users Data.
   *
   */
  usersToJson() {
    var json_builder = {};
    for (key in this.d_users) {
      json_builder[key] = this.d_users[key].toJSON();
      console.log(json_builder);
    }
    return json_builder;
  }

  /**this function create an User object and add it to the game, after the game Key Auth.
   * @param {*} userID
   * @param {*} userName
   * @param {*} connection - the webScoket connection of this user
   * @param {*} gameKey
   */
  handle_req_user_login(userID, userName, connection, gameKey) {
    var curUser = this.checkIfDisconnected(userID, userName);
    if (curUser == undefined) {
      curUser = new User(userName, gameKey, this.getGroupNum());
    }

    curUser.setConnection(connection);

    this.d_users[userID] = curUser;

    connection.send(
      JSON.stringify({
        type: GAME_KEY_SUCCESS,
        id: userID,
        name: userName,
        score: this.d_users[userID].curr_score,
        keygame: gameKey, //TODO:::  change this veriable in client
        group: this.d_users[userID].group,
      })
    );

    // update users connecting
    this.curr_connected_users++;
    this.groups[curUser.group].participants++;

    // update the admin on the number of users that get in
    this.sendUserTable();

    // TODO: remove these prints
    // if (printLogs) {
    //   log_activated_new_user_instance(gameKey, userID);
    //   log_game_status(gameKey);
    // }
  }

  /**
   * reset arguments before question phase load
   * bars lock, knowloedge_question_answers, knowloedge_question_dist
   */
  clean_arguments_for_question() {
    const cur_answers_dict = {};
    const len = this.curr_phase.phaseProp.answers.length;
    for (var i = 0; i < len; i++) {
      cur_answers_dict[i + 1] = 0;
    }
    console.log(cur_answers_dict);
    this.barsMutex = true;
    this.knowledge_question_answers = cur_answers_dict;
    this.knowledge_question_dist = cur_answers_dict;
  }

  /** time the next phase to be loaded to the uswers */
  handle_change_screen(phaseName = null) {
    if (this.pause) {
      clearTimeout(this.timer);
      return;
    }
    this.gameStarted = true;
    if (phaseName == null) {
      this.curr_phase = this.gameDefenition[this.phaseList[this.nextPhase]];
      phaseName = this.curr_phase.key;
    } else {
      this.curr_phase = this.gameDefenition[phaseName];
      clearTimeout(this.timer);
    }
    if (this.curr_phase.type == "Question") {
      this.clean_arguments_for_question();
    }
    if (this.curr_phase.type == "Bars") {
      const questionPhase = this.gameDefenition[
        this.phaseList[this.phaseList.indexOf(phaseName) - 1]
      ];
      this.send_bars(questionPhase);
    } else if (this.curr_phase.type == "Top3") {
      this.top3Users();
    } else {
      for (key in this.d_users) {
        this.d_users[key].connection.send(
          JSON.stringify({
            type: PHASE,
            phase: this.curr_phase.type,
            phaseProp: this.curr_phase.phaseProp,
            score: this.d_users[key].curr_score,
          })
        );
      }
    }
    var that = this;
    this.timer = setTimeout(function () {
      that.handle_change_screen();
    }, this.curr_phase.duration * 1000);
    //TODO:: only for devoloping , after last phase the game Restart.
    if (this.phaseList.indexOf(phaseName) == this.phaseList.length - 1) {
      this.writeResultCsv();
      this.nextPhase = 0;
      return;
    }
    this.nextPhase = this.phaseList.indexOf(phaseName) + 1;
  }
  /** This function update the user answer and score
   *  @updated dicts: d_users_answers, d_activeGames
   *  @return: if all users answerd (or time is over) send to all users if they right (true) and the updated score
   */
  handle_user_answer(gameKey, userID, answer, time) {
    const answerProp = {
      userID: userID,
      answer: answer,
      time: time,
    };
    this.d_users[userID].last_answer = answer;
    this.d_users_answers.push(answerProp);
  }

  send_bars(questionPhase) {
    this.updateScoreForUsers(questionPhase);
    for (key in this.d_users) {
      this.d_users[key].connection.send(
        JSON.stringify({
          type: PHASE,
          phase: "bars",
          phaseProp: {
            distribution: this.knowledge_question_dist,
            correctAnswer: questionPhase.correct_answer,
            answers: questionPhase.phaseProp.answers,
            userAnswer: this.d_users[key].last_answer,
          },
          score: this.d_users[key].curr_score,
        })
      );
    }
    this.sendUserTable();
    this.cleanUsersLastAnswer(questionPhase);
  }

  handler_user_video_end() {
    this.user_semaphore++;
    if (this.user_semaphore == Object.keys(this.d_users).length) {
      this.user_semaphore = 0;
      this.handle_change_screen();
    }
  }

  /** This function delete the user from server (and his connections) and remove it to the archive dict
   * @updated dict: d_users, curr_connected_users, diconnected user
   * @call send_bars for handle exit inside a question Phase
   * @return: null
   */
  handle_delete_user(userID, gameKey) {
    try {
      const groupNumber = this.d_users[userID].group;
      delete this.groups[groupNumber].participants--;
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
  sortByScore(usersOrGroups) {
    let refDict = usersOrGroups === "users" ? this.d_users : this.groups;
    var items = Object.keys(refDict).map(function (key) {
      return [key, refDict[key]];
    });

    items.sort(function (first, second) {
      return second[1].curr_score - first[1].curr_score;
    });
    return items;
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
    const usersByScore = this.sortByScore("users");
    const topUsers = usersByScore.slice(0, 3);
    for (key in this.d_users) {
      this.d_users[key].connection.send(
        JSON.stringify({
          type: PHASE,
          phase: "Top3",
          phaseProp: {
            users: topUsers,
            audio: this.curr_phase.phaseProp.audioArr,
          },
          score: this.d_users[key].curr_score,
        })
      );
    }
  }

  setPause() {
    this.pause = true;
  }
  setResume() {
    this.pause = false;
  }
  sendUserTable() {
    this.admin.connection.send(
      JSON.stringify({
        type: USER,
        usersData: this.usersToJson(),
      })
    );
  }

  /**
   * @param {Json} user_dic - Json data structure to find user by name in it.
   * @param {string} name - user name to search
   * @returns {string} return the user id object or undifined if false
   */
  findUserByName(user_dic, _name) {
    var curUser;
    for (var user in user_dic) {
      if (user_dic[user] != undefined) {
        if (user_dic[user].name == _name) {
          curUser = user;
          break;
        }
      }
    }
    return curUser;
  }
  /**
   * find if the user appears in the arcive, in production find by id (ip) in develop find by name
   * @param {*} userID - the user id
   * @param {*} userName - the user name
   * @retrn curUser - if exist ? userObject : undifiend
   */
  checkIfDisconnected(userID, userName) {
    userID =
      process.env.NODE_ENV === "production"
        ? userID
        : this.findUserByName(this.archive_user_dict, userName);
    const curUser = this.archive_user_dict[userID];
    if (curUser != undefined) {
      delete this.archive_user_dict[userID];
    }
    return curUser;
  }
  writeResultCsv() {
    converter.json2csv(this.gameResult, (err, csv) => {
      if (err) {
        throw err;
      }

      // print CSV string
      console.log(csv);

      // write CSV to a file
      fs.writeFileSync("todos.csv", csv);
    });
  }
}
module.exports = RuningGame;
