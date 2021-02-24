const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const http = require("http");
const https = require("https");
const WebSocket = require("ws");
const production = process.env.NODE_ENV === "production";
const ws_PORT = 8000;
const INDEX = "/index.html";
const fs = require("fs");
var sshKey = production
  ? fs.readFileSync("/etc/ssl/private/apache-selfsigned.key")
  : "";
var cert = production
  ? fs.readFileSync("/etc/ssl/certs/apache-selfsigned.crt")
  : "";
var options = {
  key: sshKey,
  cert: cert,
};
const app = express();

//  Connect Database
connectDB();

//init Middleware
app.use(express.json({ extended: false }));

// Define Routesnpm
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/admin", require("./routes/api/admin"));

//Server static assets in production

// Set static folder
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

var server_ws = production
  ? https.createServer(options, app)
  : http.createServer();
var SSserver = production
  ? https.createServer(options, app)
  : http.createServer();
const wsServer = new WebSocket.Server({ server: server_ws });

// SSserver.listen(PORT, () => console.log("Server Started at: " + PORT));
production
  ? SSserver.listen(PORT, () => console.log("Server Started at: " + PORT))
  : app.listen(PORT, () => console.log("Server Started at: " + PORT));
server_ws.listen(ws_PORT, () => console.log("Server Started at: " + ws_PORT));
//#################################################################################################################################################################################################################

// Const enums
const printLogs = false;
const [
  MAKAF,
  USER_ANSWER,
  PHASE,
  REQ_USER_LOGIN,
  GAME_KEY_SUCCESS,
  GAME_KEY_FAIL,
  CREATE_NEW_GAME_INSTANCE,
  VIDEO_END,
  PAUSE,
  RESUME,
  IMG,
  CAMERA_NOT_ALLOWED,
  USER_RECONNECT,
] = [
  40,
  "USER_ANSWER",
  "PHASE",
  "REQ_USER_LOGIN",
  "GAME_KEY_SUCCESS",
  "GAME_KEY_FAIL",
  "CREATE_NEW_GAME_INSTANCE",
  "VIDEO_END",
  "PAUSE",
  "RESUME",
  "IMG",
  "CAMERA_NOT_ALLOWED",
  "USER_RECONNECT",
];
const User = require("./serverClasses/user");
const Admin = require("./serverClasses/admin");
const RuningGame = require("./serverClasses/runingGame");
var gameDefenition = require("./serverClasses/gameDefintionDev");
var gameDefenition = gameDefenition.gameDefenition;

/**
 * Data Structure explenation for dictionaries:
 *   @var d_admins = {key: server_given_user_id, value: gameKey: number
 *   @var d_connections = {key: server_given_user_id, value: connection}
 *   @var d_activeGame = {key: gameKey, value: gameProperties - see function: "setGameProperties" }
 *        d_group = {key: server_given_group_id, value: group_score}
 *        d_users = {key: server_given_user_id, value: user_name: string, gameKey: number ,group_num: number, curr_score: number,
 *                  last_answer_currectnes: boolean, general_question_list}
 *        d_users_answers = {key: user_id, value: [answer (number), time (number)]}
 */
const d_admins = {};
const d_activeGames = {};
phaseList = [];
for (key in gameDefenition) {
  phaseList.push(key);
}

const { connection } = require("mongoose");
const { fstat } = require("fs");

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
const getUniqueGameKey = () => {
  (max = 9999), (min = 1111);
  var gameKey;
  do {
    gameKey = Math.floor(Math.random() * (max - min)) + min;
  } while (gameKey.toString() in d_activeGames);
  if (!production) gameKey = 1;

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
  admin_ID,
  connection,
  numOfParticipates = 1,
  name,
  gameType = 1
) => {
  var new_admin;
  if (name in d_admins) {
    new_admin = d_admins[name];
    new_admin.setConnection(connection);
    d_activeGames[new_admin.gameKey].admin = new_admin;
    connection.send(
      JSON.stringify({
        type: CREATE_NEW_GAME_INSTANCE,
        keyGame: new_admin.gameKey,
        phaseList: phaseList,
        numOfPlayers: numOfParticipates,
      })
    );
    d_activeGames[new_admin.gameKey].admin_re_enter();
    return new_admin.gameKey;
  }
  const gameKey = getUniqueGameKey(admin_ID, gameType, numOfParticipates);

  new_admin = new Admin(admin_ID, gameKey);
  d_admins[name] = new_admin;

  d_activeGames[gameKey] = new RuningGame(
    new_admin,
    gameType,
    numOfParticipates,
    phaseList,
    gameDefenition
  );
  if (printLogs) {
    log_activeGames();
    log_game_status(gameKey);
  }
  d_admins[name].setConnection(connection);
  // d_connections[userID] = connection;

  connection.send(
    JSON.stringify({
      type: CREATE_NEW_GAME_INSTANCE,
      keyGame: gameKey,
      phaseList: phaseList,
      numOfPlayers: numOfParticipates,
    })
  );
  return gameKey;
};

/** This function delete the admin from server (and his connections)
 * updated dict: d_users, d_connections, d_activatedGames
 *  return: null
 */
const handle_delete_admin = (userID, gameKey) => {
  // delete_game_instance(gameKey);
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

wsServer.on("connection", (request) => {
  try {
    log_print_structure_head("Server: Connection Request");
    const connection = request;
    var gameKey;
    var adminName;
    // const userID = production ? request._socket.remoteAddress : getUniqueID();
    const userID = getUniqueID();

    connection.on("message", function (message) {
      console.log(message);
      try {
        const userlog = JSON.parse(message);

        // first message
        if (undefined === (adminName || gameKey)) {
          adminName = userlog.name;
          gameKey = userlog.gameKey;
        }

        switch (userlog.type) {
          case CREATE_NEW_GAME_INSTANCE:
            gameKey = handle_new_game_instance(
              userID,
              connection,
              userlog.numOfPlayers,
              adminName
            );
            break;

          case REQ_USER_LOGIN:
            if (gameKey in d_activeGames) {
              d_activeGames[gameKey].handle_req_user_login(
                userID,
                connection,
                gameKey
              );
            } else handle_bad_req_user_login(connection, gameKey);
            break;
          case USER_RECONNECT:
            if (gameKey in d_activeGames) {
              d_activeGames[gameKey].handle_user_reconnect(
                userID,
                connection,
                userlog.playerNumber,
                gameKey
              );
            } else handle_bad_req_user_login(connection, gameKey);
            break;

          case PHASE:
            d_activeGames[gameKey].handle_change_screen(userlog.phaseName);
            break;

          case USER_ANSWER:
            d_activeGames[gameKey].handle_user_answer(
              userID,
              userlog.answer,
              userlog.time,
              userlog.key
            );
            break;
          case VIDEO_END:
            d_activeGames[gameKey].handler_user_video_end();
            // handle_user_answer(gameKey, userID, userlog.answer, userlog.time);
            break;
          case PAUSE:
            d_activeGames[gameKey].setPause();
            break;
          case RESUME:
            d_activeGames[gameKey].setResume();
            d_activeGames[gameKey].handle_change_screen();
            break;
          case IMG:
            d_activeGames[gameKey].handle_user_img(userID, userlog.img);
          case CAMERA_NOT_ALLOWED:
            d_activeGames[gameKey].handle_user_img(userID, "");
        }
      } catch (err) {
        console.log(err.message);
      }
    });

    connection.on("close", function (connection) {
      if (gameKey in d_activeGames)
        if (userID in d_activeGames[gameKey].d_users)
          d_activeGames[gameKey].handle_delete_user(userID, gameKey);

      if (userID in d_admins) handle_delete_admin(userID, d_admins[userID]);
    });
  } catch (err) {
    console.log(err.message);
  }
});
