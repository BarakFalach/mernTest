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
const User = require("./serverClasses/user");
const Admin = require("./serverClasses/admin");
const RuningGame = require("./serverClasses/runingGame");
var gameDefenition = require("./serverClasses/gameDefintionDev");
var gameDefenition = gameDefenition.gameDefenition;
/**
 * Data Structure explenation for dictionaries:
 *    d_admins = {key: server_given_user_id, value: gameKey: number
 *    d_connections = {key: server_given_user_id, value: connection}
 *    d_activeGame = {key: gameKey, value: gameProperties - see function: "setGameProperties" }
 *        d_group = {key: server_given_group_id, value: group_score}
 *        d_users = {key: server_given_user_id, value: user_name: string, gameKey: number ,group_num: number, curr_score: number,
 *                  last_answer_currectnes: boolean, general_question_list}
 *        d_users_answers = {key: user_id, value: [answer (number), time (number)]}
 */

const d_admins = {};
// const d_connections = {};
const d_activeGames = {};
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

/** This function generates unique userId for every user
 *  return: The uniqe userId
 */
//TODO:: can be moved to User Module
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};

/** This function generates unique Game-Key
 * create Admin Object for the game
 * create RuninigGame Object for the game
 * connect the admin to the Rununing Game.
 *  return: Array of the sorted users
 */
const getUniqueGameKey = (admin_ID, gameType, numOfParticipates) => {
  (max = 9999), (min = 1111);
  var gameKey;
  do {
    gameKey = Math.floor(Math.random() * (max - min)) + min;
  } while (gameKey.toString() in d_activeGames);
  gameKey = 1;

  new_admin = new Admin(admin_ID, gameKey);
  d_admins[gameKey] = new_admin;

  d_activeGames[gameKey] = new RuningGame(
    d_admins[gameKey],
    gameType,
    numOfParticipates
  );
  // setGameProperties(gameKey, admin_ID, gameType, numOfParticipates);
  return gameKey.toString();
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
  d_admins[gameKey].setConnection(connection);
  // d_connections[userID] = connection;

  connection.send(
    JSON.stringify({
      type: CREATE_NEW_GAME_INSTANCE,
      keyGame: gameKey,
      phaseList: phaseList,
    })
  );
  return gameKey;
};

/** This function delete the admin from server (and his connections)
 * updated dict: d_users, d_connections, d_activatedGames
 *  return: null
 */
const handle_delete_admin = (userID, gameKey) => {
  // TODO: decide if admin logout create finish game action
  delete_game_instance(gameKey);
  // delete d_connections[userID];
  console.log("SERVER : Admin conenction closed (userID: " + userID + ")");
};

/** This function delete the game instance from the server
 *
 */
const delete_game_instance = (gameKey) => {
  for (let user in d_activeGames[gameKey].d_users)
    d_activeGames[gameKey].handle_delete_user(user, gameKey);
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
        gameKey = handle_new_game_instance(userID, connection);
        break;

      case REQ_USER_LOGIN:
        if (gameKey in d_activeGames)
          d_activeGames[gameKey].handle_req_user_login(
            userID,
            userName,
            connection,
            gameKey
          );
        else handle_bad_req_user_login(connection, gameKey);
        break;

      case PHASE:
        d_activeGames[gameKey].handle_change_screen(
          gameKey,
          userlog.phase,
          userlog.phaseName,
          gameDefenition
        );
        break;

      case USER_ANSWER:
        console.log(userlog.answer);
        d_activeGames[gameKey].handle_user_answer(
          gameKey,
          userID,
          userlog.answer,
          userlog.time
        );
        // handle_user_answer(gameKey, userID, userlog.answer, userlog.time);
        break;
    }
  });

  connection.on("close", function (connection) {
    if (gameKey in d_activeGames)
      if (userID in d_activeGames[gameKey].d_users)
        d_activeGames[gameKey].handle_delete_user(userID, gameKey);

    if (userID in d_admins) handle_delete_admin(userID, d_admins[userID]);
  });
});
