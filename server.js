const express = require("express");
const connectDB = require("./config/db");

const app = express();
//  Connect Database
connectDB();

//init Middleware
app.use(express.json({ extended: false }));

// Define Routesnpm
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/admin", require("./routes/api/admin"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server Started at: " + PORT));

//#################################################################################################################################################################################################################

// Const enums
const printLogs = true;
const MAKAF = 40;
const UPDATE_SCORE = "UPDATE_SCORE";
const USER_ANSWER = "USER_ANSWER";
const PHASE = "PHASE";
const REQ_USER_LOGIN = "REQ_USER_LOGIN";
const GAME_KEY_SUCCESS = "GAME_KEY_SUCCESS";
const GAME_KEY_FAIL = "GAME_KEY_FAIL";
const CREATE_NEW_GAME_INSTANCE = "CREATE_NEW_GAME_INSTANCE";
const NUMBER_OF_CONNECTED_USERS = "NUMBER_OF_CONNECTED_USERS";

const webSocketsServerPort = require("./ServerUtils").WebSocketServerPort;

/**
 * Data Structure explenation for dictionaries:
 *    d_admins = {key: server_given_user_id, value: gameKey: number
 *    d_connections = {key: server_given_user_id, value: connection}
 *    d_activeGame = {key: gameKey, value: gameProperties - see function: "setGameProperties" }
 *        d_group = {key: server_given_group_id, value: group_score}
 *        d_users = {key: server_given_user_id, value: user_name: string, gameKey: number ,group_num: number, curr_score: number,  last_answer_currectnes: boolean}
 *        d_users_answers = {key: user_id, value: [answer (number), time (number)]}
 */

const d_users = {};
const d_admins = {};
const d_connections = {};
const d_activeGames = {};

// temp data stracure , only for testing
const gameDefenition = {};
gameDefenition["video1"] = {
  type: "video",
  phaseProp: {
    videoUrl: "https://vimeo.com/204414561",
  },
};
gameDefenition["question1"] = {
  type: "Question",
  phaseProp: {
    question: "how are you today",
    answers: ["good", "great", "OK", "comsi comsa"],
    time: 8,
  },
};
gameDefenition["question2"] = {
  type: "Question",
  phaseProp: {
    question: "how are you Tommorow",
    answers: ["good", "great", "OK", "comsi comsa"],
    time: 8,
  },
};
gameDefenition["video2"] = {
  type: "video",
  phaseProp: {
    videoUrl: "https://player.vimeo.com/video/494218419",
  },
};
gameDefenition["question3"] = {
  type: "Question",
  phaseProp: {
    question: "how are you in the day after Tommorow",
    answers: ["good", "great", "OK", "comsi comsa"],
    time: 8,
  },
};
phaseList = [];
for (key in gameDefenition) {
  phaseList.push(key);
}

var WebSocketServer = require("websocket").server;
var http = require("http");
const { connection } = require("mongoose");

var server = http.createServer(function (req, res) {
  res.end();
});
server.listen(webSocketsServerPort, function () {
  console.log(
    new Date() + " Server is listening on port " + webSocketsServerPort
  );
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

/** This function set the game properties object and push it to the active games dictionary.
 *  return: null
 */
const setGameProperties = (gameKey, admin_ID, gameType, numOfParticipates) => {
  var newGroup = {
    participants: 0,
    curr_score: 0,
  };

  var gameProps = {
    admin: admin_ID,
    game_type: gameType,
    groups: {
      1: {
        participants: 0,
        curr_score: 0,
      },
      2: {
        participants: 0,
        curr_score: 0,
      },
    },
    d_users: {},
    d_users_answers: {},
    num_of_participates: numOfParticipates,
    curr_connected_users: 0,
    curr_answered_questions: 0,
    curr_pos: 0,
  };
  d_activeGames[gameKey] = gameProps;
};

/** This function generates unique userId for every user
 *  return: The uniqe userId
 */
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

/** This function generates unique Game-Key
 *  return: Array of the sorted users
 */
const getUniqueGameKey = (admin_ID, gameType, numOfParticipates) => {
  (max = 9999), (min = 1111);
  var gameKey;
  do {
    gameKey = Math.floor(Math.random() * (max - min)) + min;
  } while (gameKey.toString() in d_activeGames);

  setGameProperties(gameKey, admin_ID, gameType, numOfParticipates);
  return gameKey.toString();
};

/** This function change the next group num
 *  return: The new group number
 */
const getGroupNum = (gameKey) => {
  let tmp_dict = d_activeGames[gameKey].groups;
  let key = Object.keys(tmp_dict).reduce((key, v) =>
    tmp_dict[v].participants < tmp_dict[key].participants ? v : key
  );
  return key;
};

/** This function update the group total score with the given score
 *  return: null
 */
const updateScoreForGroup = (gameKey, group, score) => {
  d_activeGames[gameKey].groups[group].curr_score += score;
};

/** This function update the users and group score after timeOut / all users answered
 *  Structure: d_users_answers = {key: userID, value: [answer, time]}
 *  return: null
 */
const cleanUsersLastAnswer = (gameKey) => {
  for (item in d_activeGames[gameKey].d_users) {
    d_activeGames[gameKey].d_users[item].last_answer_correctness = false;
  }
};

/** This function clean the last_answer_correctness to all game's users to false
 *  update dicts: d_users_answers - clean, d_users- clean last_answer_correctness
 *  return: null
 */
const updateScoreForUsers = (gameKey) => {
  var items = Object.keys(d_activeGames[gameKey].d_users_answers).map(function (
    key
  ) {
    return [key, d_activeGames[gameKey].d_users_answers[key]];
  });

  items.sort(function (first, second) {
    return first[1].time - second[1].time;
  });

  var scoreCounter = 1;
  for (item in items) {
    if (items[item].answer === currentRightAnswer) {
      d_activeGames[gameKey].d_users[item].curr_score += scoreCounter;
      d_activeGames[gameKey].d_users[item].last_answer_correctness = true;
      updateScoreForGroup(
        d_activeGames[gameKey].d_users[item].group_num,
        scoreCounter
      );
      scoreCounter++;
    } else {
      d_activeGames[gameKey].d_users[item].last_answer_correctness = false;
    }
  }
};

/** This function sort the users or groups dictionaries by score
 *  return: Array of the sorted users
 */
const sortByScore = (gameKey, usersOrGroups) => {
  let refDict =
    usersOrGroups === "users"
      ? d_activeGames[gameKey].d_users
      : d_activeGames[gameKey].groups;
  var items = Object.keys(refDict).map(function (key) {
    return [key, refDict[key]];
  });

  items.sort(function (first, second) {
    return second[1].curr_score - first[1].curr_score;
  });
  return items;
};

/** This function check who is the winning group at this point
 *  return: The currently winning group
 */
const currentWinningGroup = () => {
  const groups = sortByScore("groups");
  return groups[0];
};

/** This function get the top 3 users by score
 *  return: array of 3 top users by score
 */
const top3Users = () => {
  const users = sortByScore("users");
  const topUsers = users.slice(0, 3);
  return topUsers;
};

/** This function print the instance of a new user
 *  return: null
 */
const log_activated_new_user_instance = (gameKey, userID) => {
  log_print_structure_head("New User Created (" + userID + ")");
  for (const [key, value] of Object.entries(
    d_activeGames[gameKey].d_users[userID]
  )) {
    log_print_structure_body(key + ": " + value);
  }
  log_print_structure_end();
};

/**
 *  These 3 function beloew (log_prints) create a structure of an order message
 */
const log_print_structure_head = (header) => {
  const newMakaf = "-".repeat((MAKAF - header.length) / 2);
  console.log("\n" + newMakaf + header + newMakaf);
};

const log_print_structure_body = (body) => {
  const spaces = " ".repeat(MAKAF - (body.length + 4));
  console.log("# " + body + spaces + " #");
};

const log_print_structure_end = () => {
  console.log("-".repeat(MAKAF) + "\n");
};

/** This function is a recursive function to help "log_game_status" function
 *  return: null
 */
const log_game_status_sub = (key, value, i) => {
  if (typeof value === "object") {
    log_print_structure_body(" ".repeat(i) + key + ": ");

    for (const [keyS, valueS] of Object.entries(value)) {
      log_game_status_sub(keyS, valueS, i + 1);
    }
  } else {
    log_print_structure_body(" ".repeat(i) + key + ": " + value);
  }
};

/** This function print the game status by given a game key
 *  return: null
 */
const log_game_status = (gameKey) => {
  const printName = " Game Status " + gameKey + " ";
  log_print_structure_head(printName);
  for (const [key, value] of Object.entries(d_activeGames[gameKey])) {
    if (key !== "d_users") {
      if (typeof value === "object") {
        log_game_status_sub(key, value, 0);
      } else {
        log_print_structure_body(key + ": " + value);
      }
    }
  }
  log_print_structure_end();
};

/** This function print the game status by given a game key
 *  return: null
 */
const log_activeGames = () => {
  log_print_structure_head(
    "Current Activated Games (" + Object.keys(d_activeGames).length + ")"
  );
  for (var key in d_activeGames) {
    log_print_structure_body(key);
  }
  log_print_structure_end();
};

/** This function update the user's properties to the relevant dictionaries
 *  updated dicts: d_users, d_connections
 *  return: send a success message
 */
const handle_req_user_login = (userID, userName, connection, gameKey) => {
  const userProp = {
    user_name: userName,
    game_key: gameKey,
    group_num: getGroupNum(gameKey),
    curr_score: 0,
    last_answer_correctness: false,
  };

  d_activeGames[gameKey].d_users[userID] = userProp;
  d_connections[userID] = connection;

  for (key in d_connections) {
    d_connections[key].send(
      JSON.stringify({
        type: "USER",
        usersData: d_activeGames[gameKey].d_users,
      })
    );
  }

  connection.send(
    JSON.stringify({
      type: GAME_KEY_SUCCESS,
      id: userID,
      name: userName,
      score: d_activeGames[gameKey].d_users[userID].curr_score,
      keygame: gameKey, //TODO:::  change this veriable in client
      group: d_activeGames[gameKey].d_users[userID].group_num,
      // TODO: send all the game structure
    })
  );

  // update users connecting
  d_activeGames[gameKey].curr_connected_users++;
  d_activeGames[gameKey].groups[userProp.group_num].participants++;

  // update the admin on the number of users that get in
  d_connections[d_activeGames[gameKey].admin].send(
    JSON.stringify({
      type: NUMBER_OF_CONNECTED_USERS,
      curr_connected_users: d_activeGames[gameKey].curr_connected_users,
    })
  );

  // TODO: remove these prints
  if (printLogs) {
    log_activated_new_user_instance(gameKey, userID);
    log_game_status(gameKey);
  }
};

/** This function print that the user insert not active game
 *  return: null
 */
const log_fail_game_key = (gameKey) => {
  log_print_structure_head("Game Key Error (" + gameKey + ")");
  log_print_structure_body("User insert not activate game key");
  log_print_structure_end();
};

/** This function update the user that there is no such a game key in the server
 *  return: send a fail message
 */
const handle_bad_req_user_login = (connection, gameKey) => {
  connection.send(
    JSON.stringify({
      type: GAME_KEY_FAIL,
    })
  );

  // TODO: remove these prints
  if (printLogs) log_fail_game_key(gameKey);
};

/** This function create a new game key
 *  return: send the admin the new game key
 *  TODO: handle in admin - present the game key in the admin dashboard
 */
const handle_new_game_instance = (
  userID,
  connection,
  gameType = 1,
  numOfParticipates = 1
) => {
  const gameKey = getUniqueGameKey(userID, gameType, numOfParticipates);
  if (printLogs) log_activeGames();
  log_game_status(gameKey);
  d_connections[userID] = connection;
  d_admins[userID] = gameKey;

  connection.send(
    JSON.stringify({
      type: CREATE_NEW_GAME_INSTANCE,
      keyGame: gameKey,
      phaseList: phaseList,
    })
  );
};

/** This function change the users screen
 *  return: send to all users the new screen to show
 */
const handle_change_screen = (phase, phaseName) => {
  for (key in d_connections) {
    d_connections[key].send(
      JSON.stringify({
        type: PHASE,
        phase: gameDefenition[phaseName].type,
        phaseProp: gameDefenition[phaseName].phaseProp,
      })
    );
  }
};

/** This function update the user answer and score
 *  updated dicts: d_users_answers, d_activeGames
 *  return: if all users answerd (or time is over) send to all users if they right (true) and the updated score
 */
const handle_user_answer = (gameKey, userID, answer, time) => {
  const answerProp = {
    answer: answer,
    time: time,
  };
  d_activeGames[gameKey].d_users_answers[userID] = answerProp;
  d_activeGames[gameKey].curr_answered_questions++;

  // TODO: add self timer (even if not all users reply the answer) for deadline time to answer
  if (
    d_activeGames[gameKey].curr_answered_questions ===
    size(d_connections.keys()) - 1
  ) {
    d_activeGames[gameKey].curr_answered_questions = 0;
    updateScoreForUsers(gameKey);

    for (key in d_activeGames[gameKey].d_users) {
      d_connections[key].send(
        JSON.stringify({
          type: UPDATE_SCORE,
          answer: d_activeGames[gameKey].d_users[key].last_answer_correctness, // return true or false
          score: d_activeGames[gameKey].d_users[key].curr_score, // send the new score
        })
      );
    }
    cleanUsersLastAnswer(gameKey);
  }
};

/** This function delete the user from server (and his connections)
 * updated dict: d_users, d_connections, d_activatedGames
 *  return: null
 */
const handle_delete_user = (userID, gameKey) => {
  try {
    const groupNumber = d_activeGames[gameKey].d_users[userID].group_num;
    delete d_activeGames[gameKey].groups[groupNumber].participants--;
    delete d_connections[userID];
    delete d_activeGames[gameKey].d_users[userID];
    delete d_activeGames[gameKey].curr_connected_users--;
    console.log("SERVER : Player conenction closed (userID: " + userID + ")");

    // TODO: Redirect the user to another page (like loginUser/home)

    log_game_status(gameKey);
  } catch (err) {
    console.log("problem in handle_delete_user failed");
  }
};

/** This function delete the admin from server (and his connections)
 * updated dict: d_users, d_connections, d_activatedGames
 *  return: null
 */
const handle_delete_admin = (userID, gameKey) => {
  // TODO: decide if admin logout create finish game action
  delete_game_instance(gameKey);
  delete d_connections[userID];
  console.log("SERVER : Admin conenction closed (userID: " + userID + ")");
};

/** This function delete the game instance from the server
 *
 */
const delete_game_instance = (gameKey) => {
  for (let user in d_activeGames[gameKey].d_users)
    handle_delete_user(user, gameKey);
  delete d_activeGames[gameKey];
  log_activeGames();
};

wsServer.on("request", function (request) {
  log_print_structure_head("Server: Connection Request");
  const userID = getUniqueID();
  const connection = request.accept(null, request.origin);
  var gameKey;
  var userName;

  connection.on("message", function (message) {
    const userlog = JSON.parse(message.utf8Data);

    // first message
    if (undefined === (userName || gameKey)) {
      userName = userlog.name;
      gameKey = userlog.keygame;
    }

    switch (userlog.type) {
      case CREATE_NEW_GAME_INSTANCE:
        handle_new_game_instance(userID, connection);
        break;

      case REQ_USER_LOGIN:
        if (gameKey in d_activeGames)
          handle_req_user_login(userID, userName, connection, gameKey);
        else handle_bad_req_user_login(connection, gameKey);
        break;

      case PHASE:
        handle_change_screen(userlog.phase, userlog.phaseName);
        break;

      case USER_ANSWER:
        handle_user_answer(gameKey, userID, userlog.answer, userlog.time);
        break;
    }
  });

  connection.on("close", function (connection) {
    if (gameKey in d_activeGames)
      if (userID in d_activeGames[gameKey].d_users)
        handle_delete_user(userID, gameKey);

    if (userID in d_admins) handle_delete_admin(userID, d_admins[userID]);
  });
});
