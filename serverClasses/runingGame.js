const User = require("./user");
const Admin = require("./admin");
const GAME_KEY_SUCCESS = "GAME_KEY_SUCCESS";
const PHASE = "PHASE";

class RuningGame {
  constructor(admin, gameType, numOfParticipates, phaseList, gameDefenition) {
    this.admin = admin;
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
    this.d_users_answers = {};
    this.knowledge_question_answers = {};
    this.knowledge_question_dist = {};
    this.general_questions_answers = {};
    this.num_of_participates = numOfParticipates;
    this.curr_connected_users = 0;
    this.curr_right_answer;
    this.user_semaphore = 0;
    this.curr_phase = {};
    this.pause = false;
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

  /** This function update the users and group score after timeOut / all users answered
   *  Structure: d_users_answers = {key: userID, value: [answer, time]}
   *  return: null
   */
  cleanUsersLastAnswer() {
    for (var item in this.d_users) {
      this.d_users[item].last_answer_correctness = false;
    }
  }

  /** this function sum the values of a given dict */
  sumValues(obj) {
    Object.values(obj).reduce((a, b) => a + b);
  }

  /** This function calculate knowledge distribution of the answers
   *  update dicts: d_activatedGames
   *  return: null
   */
  calculateKnowledgeDist() {
    const sum = this.sumValues(this.knowledge_question_answers);
    if (sum > 0) {
      for (key in this.knowledge_question_answers)
        this.knowledge_question_dist[key] =
          this.knowledge_question_answers[key] / sum;
    }
  }

  /** This function clean the last_answer_correctness to all game's users to false
   *  update dicts: d_users_answers - clean, d_users- clean last_answer_correctness
   *  return: null
   */
  updateScoreForUsers() {
    const users_answers = this.d_users_answers;
    var items = Object.keys(users_answers).map(function (key) {
      return [key, users_answers[key]];
    });

    items.sort(function (first, second) {
      return first[1].time - second[1].time;
    });

    var scoreCounter = 1;
    for (var index in items) {
      var item = items[index];

      this.knowledge_question_answers[item[1].answer] += 1;
      if (item[1].answer == this.curr_phase.correct_answer) {
        this.d_users[item[0]].curr_score += scoreCounter;
        this.d_users[item[0]].last_answer_correctness = true;
        this.updateScoreForGroup(this.d_users[item[0]].group, scoreCounter);
        scoreCounter++;
      } else {
        this.d_users[item[0]].last_answer_correctness = false;
      }
    }
    this.calculateKnowledgeDist();
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
    var curUser = new User(userName, gameKey, this.getGroupNum());

    curUser.setConnection(connection);

    this.d_users[userID] = curUser;

    connection.send(
      JSON.stringify({
        type: GAME_KEY_SUCCESS,
        id: userID,
        name: userName,
        score: this.d_users[userID].curr_score,
        keygame: gameKey, //TODO:::  change this veriable in client
        group: this.d_users[userID].group_num,
        // TODO: send all the game structure
      })
    );

    // update users connecting
    this.curr_connected_users++;
    this.groups[curUser.group].participants++;

    // update the admin on the number of users that get in
    this.admin.connection.send(
      JSON.stringify({
        type: "USER",
        usersData: this.usersToJson(),
      })
    );

    // TODO: remove these prints
    // if (printLogs) {
    //   log_activated_new_user_instance(gameKey, userID);
    //   log_game_status(gameKey);
    // }
  }

  reset_question_dict() {
    const cur_answers_dict = {};
    for (var index in this.curr_phase.phaseProp.answers) {
      cur_answers_dict[index] = 0;
    }
    this.knowledge_question_answers = cur_answers_dict;
    this.knowledge_question_dist = cur_answers_dict;
  }

  /** This function change the users screen
   *  return: send to all users the new screen to show
   */
  handle_change_screen(phaseName = null) {
    if (this.pause) {
      return;
    }
    if (phaseName == null) {
      this.curr_phase = this.gameDefenition[this.phaseList[this.nextPhase]];
      phaseName = this.curr_phase.key;
    } else {
      this.curr_phase = this.gameDefenition[phaseName];
    }
    if (this.curr_phase.type == "Question") {
      this.reset_question_dict();
    }
    for (key in this.d_users) {
      this.d_users[key].connection.send(
        JSON.stringify({
          type: PHASE,
          phase: this.curr_phase.type,
          phaseProp: this.curr_phase.phaseProp,
        })
      );
    }
    //TODO:: only for devoloping , after last phase the game Restart.
    if (this.phaseList.indexOf(phaseName) == this.phaseList.length - 1) {
      this.nextPhase = 0;
      return;
    }
    this.nextPhase = this.phaseList.indexOf(phaseName) + 1;
  }
  /** This function update the user answer and score
   *  updated dicts: d_users_answers, d_activeGames
   *  return: if all users answerd (or time is over) send to all users if they right (true) and the updated score
   */
  handle_user_answer(gameKey, userID, answer, time) {
    const answerProp = {
      answer: answer,
      time: time,
    };
    this.d_users_answers[userID] = answerProp;
    this.user_semaphore++;

    // TODO: add self timer (even if not all users reply the answer) for deadline time to answer
    if (this.user_semaphore == Object.keys(this.d_users).length) {
      this.user_semaphore = 0;
      this.updateScoreForUsers();
      console.log({
        distribution: this.knowledge_question_dist,
        correct: this.d_users[userID].last_answer_correctness,
      });
      for (key in this.d_users) {
        this.d_users[key].connection.send(
          JSON.stringify({
            type: PHASE,
            phase: "bars",
            phaseProp: {
              distribution: this.knowledge_question_dist,
              correct: this.d_users[key].last_answer_correctness,
            },
          })
        );
      }
      this.cleanUsersLastAnswer();
      var that = this;
      setTimeout(function () {
        that.handle_change_screen();
      }, 4000);
    }
  }

  handler_user_video_end() {
    this.user_semaphore++;
    if (this.user_semaphore == Object.keys(this.d_users).length) {
      this.user_semaphore = 0;
      this.handle_change_screen();
    }
  }

  /** This function delete the user from server (and his connections)
   * updated dict: d_users, d_connections, d_activatedGames
   *  return: null
   */
  handle_delete_user(userID, gameKey) {
    try {
      const groupNumber = this.d_users[userID].group_num;
      delete this.groups[groupNumber].participants--;
      // delete d_connections[userID];
      delete this.d_users[userID];
      delete this.curr_connected_users--;
      console.log("SERVER : Player conenction closed (userID: " + userID + ")");

      // TODO: Redirect the user to another page (like loginUser/home)

      log_game_status(gameKey);
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
    const users = sortByScore("users");
    const topUsers = users.slice(0, 3);
    return topUsers;
  }

  setPause() {
    this.pause = true;
  }
  setResume() {
    this.pause = false;
  }
}
module.exports = RuningGame;
