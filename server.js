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

const CHANGE_SCREEN = "CHANGE_SCREEN";
const REQ_USER_LOGIN = "REQ_USER_LOGIN";
const GAME_KEY_SUCCESS = "GAME_KEY_SUCCESS";
const USER_ANSWER = "USER_ANSWER";
const CREATE_NEW_GAME_INSTANCE = "CREATE_NEW_GAME_INSTANCE";
const TEMP_KEYGAME = "123";
const webSocketsServerPort = require("./ServerUtils").WebSocketServerPort;

/**
 * Data Structure of dicts:
 *    d_users = {key: server_given_user_id, value: [user_name, group_num, curr_score, boolean_last_answer_currectnes]}
 *    d_group = {key: server_given_group_id, value: group_score}
 *    d_connections = {key: server_given_user_id, value: connection}
 *    d_users_answers = {key: user_id, value: [answer (number), time (number)]}
 *    d_activeGame = {key: gameKey, value: gameProperties - see function: "setGameProperties" }
 */

const d_users = {};
const d_group = {};
const d_users_answers = {};
const d_connections = {};
const d_activeGames = {};
const numberOfGroups = 2;

var group_num = 0;
var counter_users_answerd = 0;

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
const setGameProperties = (gameKey ,admin_ID, gameType, numOfParticipates) => {
  var gameProps = {
    admin: admin_ID,
    game_type: gameType,
    participates_num: numOfParticipates,
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

  setGameProperties(gameKey ,admin_ID, gameType, numOfParticipates);
  return gameKey.toString();
};

/** This function change the next group num
 *  return: The new group number
 */
const getGroupNum = () => {
  group_num += 1;
  return group_num % numberOfGroups;
};

/** This function update the group total score with the given score
 *  return: null
 */
const updateScoreForGroup = (group, score) => {
  if (!group in d_groups) 
    d_groups[group] = 0;
  d_groups[group] += score;
};

/** This function update the users and group score after timeOut / all users answered
 *  Structure: d_users_answers = {key: userID, value: [answer, time]}
 *  return: null
 */
const updateScoreForUsers = () => {
  var items = Object.keys(d_users_answers).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return first[1][1] - second[1][1];
  });

  var counter = 1;
  for (item in items) {
    if (items[item][0] === currentRightAnswer) {
      d_users[item][2] += counter;
      d_users[item][3] = true;
      updateScoreForGroup(d_users[item][1], counter);
      counter++;
    }
  }
};


/** This function sort the users or groups dictionaries by score
 *  return: Array of the sorted users
 */
const sortByScore = (usersOrGroups) => {
  var items = Object.keys(usersOrGroups === "users" ? d_users : d_groups ).map(function(key) {
    return [key, dict[key]];
  });

  items.sort(function(first, second) {
    return second[1] - first[1];
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


/** This function print the instance of a new game 
 *  return: null
 */
const log_activated_new_game_instance = (gameKey) => {
  console.log("------------- New Game Created (" + gameKey +")----------------");
  for (const [key, value] of Object.entries(d_activeGames[gameKey])) {
    console.log(key + ": " + value);
  }
  console.log("-----------------------------------------------------");
};

/** This function update the user's properties to the relevant dictionaries
 *  return: send a success message
 */
const handle_req_user_login = (userID, userName, connection, keyGame) => {
  d_users[userID] = [userName, getGroupNum(), 0, false];
  d_connections[userID] = connection;
  connection.send(
    JSON.stringify({
      type: GAME_KEY_SUCCESS,
      id: userID,
      name: userName,
      keygame: keyGame,
    })
  );
  // TODO: remove these prints
  console.log(userName + " successfuly logged in");
  console.log("all the users logged in are -> " + Object.keys(d_users));
  console.log("users details -> " + Object.values(d_users));
};

/** This function create a new game key
 *  return: send the admin the new game key
 *  TODO: handle in admin - present the game key in the admin dashboard
 */
const handle_new_game_instance = (userID, connection, gameType = 1, numOfParticipates = 1) => {
  const keyGame = getUniqueGameKey(userID, gameType, numOfParticipates);
  log_activated_new_game_instance(keyGame)

  connection.send(
    JSON.stringify({
      type: CREATE_NEW_GAME_INSTANCE,
      keyGame: keyGame,
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
 *  return: if all users answerd (or time is over) send to all users if they right (true) and the updated score
 */
const handle_user_answer = (user_ID, answer, time) => {
  d_users_answers[user_ID] = [answer, time];
  counter_users_answerd++;
  if (counter_users_answerd === size(d_connections.keys()) - 1) {
    counter_users_answerd = 0;
    updateScoreForUsers();

    for (key in d_connections) {
      d_connections[key].send(
        JSON.stringify({
          type: UPDATE_SCORE,
          answer: d_users[user_ID][3],
          score: d_users[user_ID][2],
        })
      );
    }
  }
};


wsServer.on("request", function (request) {
  console.log("server got connection request");
  const userID = getUniqueID();
  const connection = request.accept(null, request.origin);

  connection.on("message", function (message) {
    const userlog = JSON.parse(message.utf8Data);
    console.log(userlog.name)
    if (userName === null)
      userName = userlog.name;
    switch (userlog.type) {
      case REQ_USER_LOGIN:
        if (userlog.keygame in d_activeGames) {
          handle_req_user_login(userID, userlog.name, connection, userlog.keyGame);
        }
        break;

      case CREATE_NEW_GAME_INSTANCE:
        handle_new_game_instance(userID, connection);
        break;

      case CHANGE_SCREEN:
        handle_change_screen(userlog.screen);
        break;

      case USER_ANSWER:
        handle_user_answer(user_ID, userlog.answer, userlog.time);
        break;
    }
  });

  connection.on("close", function (connection) {
    console.log("SERVER : conenction closed (userID: "+userID+")");
  });
});
