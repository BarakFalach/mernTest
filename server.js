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
const MAKAF = 40;
const UPDATE_SCORE = "UPDATE_SCORE";
const USER_ANSWER = "USER_ANSWER";
const CHANGE_SCREEN = "CHANGE_SCREEN";
const REQ_USER_LOGIN = "REQ_USER_LOGIN";
const GAME_KEY_SUCCESS = "GAME_KEY_SUCCESS";
const GAME_KEY_FAIL = "GAME_KEY_FAIL";
const CREATE_NEW_GAME_INSTANCE = "CREATE_NEW_GAME_INSTANCE";
const NUMBER_OF_CONNECTED_USERS = "NUMBER_OF_CONNECTED_USERS";

const webSocketsServerPort = require("./ServerUtils").WebSocketServerPort;

/**
 * Data Structure explenation for dictionaries:
 *    d_users = {key: server_given_user_id, value: user_name: string, gameKey: number ,group_num: number, curr_score: number,  last_answer_currectnes: boolean}
 *    d_group = {key: server_given_group_id, value: group_score}
 *    d_connections = {key: server_given_user_id, value: connection}
 *    d_users_answers = {key: user_id, value: [answer (number), time (number)]}
 *    d_activeGame = {key: gameKey, value: gameProperties - see function: "setGameProperties" }
 */

const d_users = {};
const d_group = {};
const d_connections = {};
const d_activeGames = {};

var WebSocketServer = require("websocket").server;
var http = require("http");
var d_AuthenticatedUsers = {};

var server = http.createServer(function (req, res) {
  console.log(new Date() + " Received request for ");
  res.write("Hello World!");
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
    curr_score: 0
  }

  var gameProps = {
    admin: admin_ID,
    game_type: gameType,
    groups: {
      1: {
        participants: 0,
        curr_score: 0
      },
      2: {
        participants: 0,
        curr_score: 0
      },
    },
    d_users_answers: {},
    num_of_participates: numOfParticipates,
    curr_connected_users: 0,
    curr_answered_questions: 0,
    curr_pos: 0
  }
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
  let key = Object.keys(tmp_dict).reduce((key, v) => tmp_dict[v].participants < tmp_dict[key].participants ? v : key);
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
  var items = d_users.filter(function (key) {
    return d_users[key].gameKey === gameKey;
  });

  for (item in items) {
    d_users[item].last_answer_correctness = false;
  }
};

/** This function clean the last_answer_correctness to all game's users to false
 *  update dicts: d_users_answers - clean, d_users- clean last_answer_correctness
 *  return: null
 */
const updateScoreForUsers = (gameKey) => {
  var items = Object.keys(d_activeGames[gameKey].d_users_answers).map(function (key) {
    return [key, d_activeGames[gameKey].d_users_answers[key]];
  });

  items.sort(function (first, second) {
    return first[1].time - second[1].time;
  });

  var scoreCounter = 1;
  for (item in items) {
    if (items[item].answer === currentRightAnswer) {
      d_users[item].curr_score += scoreCounter;
      d_users[item].last_answer_correctness = true;
      updateScoreForGroup(d_users[item].group_num, scoreCounter);
      scoreCounter++;
    }

    else {
      d_users[item].last_answer_correctness = false;
    }
  }
};

/** This function sort the users or groups dictionaries by score
 *  return: Array of the sorted users
 */
const sortByScore = (gameKey, usersOrGroups) => {
  let refDict = usersOrGroups === "users" ? d_users : d_activeGames[gameKey].groups;
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
const log_activated_new_user_instance = (userID, userName) => {
  console.log("-------- New User Created (" + userID + ") -----------");
  for (const [key, value] of Object.entries(d_users[userID])) {
    console.log(key + ": " + value);
  }
  console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-");
  console.log(userName + " successfuly logged in");
  console.log("all the users logged in are -> " + Object.keys(d_users));
  console.log("-----------------------------------------------------");
};


/** This function is a recursive function to help "log_game_status" function
 *  return: null
 */
const log_game_status_sub = (key, value, i) => {
  if (typeof (value) === "object") {
    console.log("  ".repeat(i) + key + ": ");
    for (const [keyS, valueS] of Object.entries(value)) {
      log_game_status_sub(keyS, valueS, i + 1)
    }
  }
  else {
    console.log("  ".repeat(i) + key + ": " + value);
  }
};

const log_print_structure_head = (header) => {
  const newMakaf = "-".repeat(((MAKAF-header.length)/2));
  console.log("\n" + newMakaf + header + newMakaf);
}


const log_print_structure_end = () => {
  console.log("-".repeat(MAKAF) + "\n");
}


/** This function print the game status by given a game key
 *  return: null
 */
const log_game_status = (gameKey) => {
  
  const printName = " Game Status "+ gameKey + " ";
  log_print_structure_head(printName);
  for (const [key, value] of Object.entries(d_activeGames[gameKey])) {
    if (typeof (value) === "object") {
      log_game_status_sub(key, value, 1);
    }
    else {
      console.log(key + ": " + value);
    }
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
    last_answer_correctness: false
  }

  d_users[userID] = userProp;
  d_connections[userID] = connection;

  connection.send(
    JSON.stringify({
      type: GAME_KEY_SUCCESS,
      id: userID,
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
  )

  // TODO: remove these prints
  if (true) {
    log_activated_new_user_instance(userID, userName);
    log_game_status(gameKey);
  };
};

/** This function print that the user insert not active game 
 *  return: null
 */
const log_fail_game_key = (gameKey) => {
  console.log("------------- Game Key Error ----------------");
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
  if (true)
    log_fail_game_key(gameKey)

};

/** This function print the instance of a new game 
 *  return: null
 */
const log_activated_new_game_instance = (gameKey) => {
  console.log("------------- New Game Created (" + gameKey + ")----------------");
  for (const [key, value] of Object.entries(d_activeGames[gameKey])) {
    console.log(key + ": " + value);
  }
  console.log("-----------------------------------------------------");
};

/** This function create a new game key
 *  return: send the admin the new game key
 *  TODO: handle in admin - present the game key in the admin dashboard
 */
const handle_new_game_instance = (userID, connection, gameType = 1, numOfParticipates = 1) => {
  const gameKey = getUniqueGameKey(userID, gameType, numOfParticipates);
  log_activated_new_game_instance(gameKey)
  d_connections[userID] = connection;

  connection.send(
    JSON.stringify({
      type: CREATE_NEW_GAME_INSTANCE,
      keyGame: gameKey,
      Video: ["correct Movie"],
      Q: ["correct answer"],
    })
  );
};

/** This function change the users screen
 *  return: send to all users the new screen to show
 */
const handle_change_screen = (adminScreen) => {
  for (key in d_connections) {
    d_connections[key].send(
      JSON.stringify({
        type: CHANGE_SCREEN,
        screen: adminScreen,
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
    time: time
  }
  d_activeGames[gameKey].d_users_answers[userID] = answerProp;
  d_activeGames[gameKey].curr_answered_questions++;

  // TODO: add self timer (even if not all users reply the answer) for deadline time to answer
  if (d_activeGames[gameKey].curr_answered_questions === size(d_connections.keys()) - 1) {
    d_activeGames[gameKey].curr_answered_questions = 0;
    updateScoreForUsers(gameKey);

    for (key in d_connections) {
      d_connections[key].send(
        JSON.stringify({
          type: UPDATE_SCORE,
          answer: d_users[userID].last_answer_correctness, // return true or false
          score: d_users[userID].curr_score,  // send the new score 
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
const habdle_delete_user = (userID, gameKey) => {
  delete d_activeGames[gameKey].groups[d_users[userID].group_num].participants--;
  delete d_activeGames[gameKey].curr_connected_users--;
  delete d_connections[userID];
  delete d_users[userID];
  console.log("SERVER : conenction closed (userID: " + userID + ")");
  log_game_status(gameKey);
};


wsServer.on("request", function (request) {
  console.log("server got connection request");
  const userID = getUniqueID();
  const connection = request.accept(null, request.origin);
  var gameKey;
  var userName;

  connection.on("message", function (message) {
    const userlog = JSON.parse(message.utf8Data);
    if (userName === undefined)
      userName = userlog.name;
    if (gameKey === undefined)
      gameKey = userlog.keygame;
    switch (userlog.type) {
      case REQ_USER_LOGIN:
        if (gameKey in d_activeGames)
          handle_req_user_login(userID, userName, connection, gameKey);
        else
          handle_bad_req_user_login(connection, gameKey);
        break;

      case CREATE_NEW_GAME_INSTANCE:
        handle_new_game_instance(userID, connection);
        break;

      case CHANGE_SCREEN:
        handle_change_screen(userlog.screen);
        break;

      case USER_ANSWER:
        handle_user_answer(gameKey, userID, userlog.answer, userlog.time);
        break;
    }
  });

  connection.on("close", function (connection) {
    habdle_delete_user(userID, gameKey);
  });
});
