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

const PHASE = "PHASE";
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
 */

const d_users = {};
const d_group = {};
const d_users_answers = {};
const d_connections = {};
const currentGamesKeys = [];
const numberOfGroups = 2;
const phaseList = {};
phaseList["question1"] = {
  question: "how are you today",
  answers: ["good", "great", "OK", "comsi comsa"],
  time: 8,
};
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
const getUniqueGameKey = () => {
  (max = 9999), (min = 11111);
  var gameKey;
  do {
    gameKey = Math.floor(Math.random() * (max - min)) + min;
  } while (gameKey in currentGamesKeys);

  currentGamesKeys.push(gameKey);
  return gameKey;
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
  if (group in d_groups.keys()) {
    d_groups[group] += score;
    return;
  }
  d_groups[group] = score;
};

/** This function update the users and group score after timeOut / all users answered
 *  Structure: d_users_answers = {key: userID, value: [answer, time]}
 *  return: null
 */
const updateScoreForUsers = () => {
  const items = list(d_users_answers.items());
  items.sort(function (a, b) {
    return -(a[1][1] - b[1][1]);
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
  const items = list(
    usersOrGroups === "users" ? d_users.items() : d_groups.items()
  );
  items.sort(function (a, b) {
    return a.score - b.score;
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

/** This function update the user's properties to the relevant dictionaries
 *  return: send a success message
 */
const handle_req_user_login = (userID, userName, connection, keyGame) => {
  d_users[userID] = {
    name: userName,
    group: getGroupNum(),
    score: 0,
    lastAnswerCorrect: false,
  };
  d_connections[userID] = connection;
  connection.send(
    JSON.stringify({
      type: GAME_KEY_SUCCESS,
      id: userID, // TODO:: not in use right now
      name: userName,
      score: d_users[userID].score,
      keygame: keyGame, //TODO:: why we need to send the gameKey to client.
    })
  );
  // TODO: remove these prints
  console.log(userName + " successfuly logged in");
  console.log("all the users logged in are -> " + Object.keys(d_users));
};

/** This function create a new game key
 *  return: send the admin the new game key
 *  TODO: handle in admin - present the game key in the admin dashboard
 */
const handle_new_game_instance = (connection) => {
  const keyGame = getUniqueGameKey();
  connection.send(
    JSON.stringify({
      type: CREATE_NEW_GAME_INSTANCE,
      keyGame: keyGame,
      Video: ["video1"],
      Q: ["question1"],
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
        phase: phase,
        phaseProp: phaseList[phaseName],
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
    switch (userlog.type) {
      case REQ_USER_LOGIN:
        // TODO: remove the "TEMP_KEYGAME OPTION"
        if (
          userlog.keygame in currentGamesKeys ||
          userlog.keygame === TEMP_KEYGAME
        ) {
          handle_req_user_login(
            userID,
            userlog.name,
            connection,
            userlog.keyGame
          );
        }
        break;

      case CREATE_NEW_GAME_INSTANCE:
        handle_new_game_instance(connection);
        break;

      case PHASE:
        handle_change_screen(userlog.phase, userlog.phaseName);
        break;

      case USER_ANSWER:
        handle_user_answer(user_ID, userlog.answer, userlog.time);
        break;
    }
  });

  connection.on("close", function (connection) {
    console.log("SERVER : conenction closed.");
  });
});
