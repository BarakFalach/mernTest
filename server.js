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
//Node.js file
const webSocketsServerPort = require("./ServerUtils").WebSocketServerPort;
const TEMP_KEYGAME = "123";
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
    new Date() + " WebSocketServer is listening on port " + webSocketsServerPort
  );
});

wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

const clients = {};
var id_counter = 1; //TODO:: for testing adding a unqiue id for player

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  return s4() + s4() + "-" + s4();
};
wsServer.on("request", function (request) {
  console.log("server got connection request");
  const userID = getUniqueID();
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  console.log(request.origin);
  connection.on("message", function (message) {
    const userlog = JSON.parse(message.utf8Data);
    const type = userlog.type;
    switch (type) {
      case "REQ_USER_LOGIN":
        if (userlog.keygame == TEMP_KEYGAME) {
          d_AuthenticatedUsers[userlog.name] = connection;
          connection.send(
            JSON.stringify({
              id: id_counter,
              name: userlog.name,
              keygame: 123,
              type: "KEYGAME_SUCCESS",
              questions: ["ques", "an1", "an2", "an3", "an4"],
            })
          );
          console.log("Admin sent questions");
          id_counter++;
          console.log(userlog.name + " successfuly logged in");
          console.log(
            "all the users logged in are -> " +
              Object.keys(d_AuthenticatedUsers)
          );
        } else {
          console.log("Bad password insertion from " + userlog.name);
        }
        break;
      case CHANGE_SCREEN:
        for (key in d_AuthenticatedUsers) {
          d_AuthenticatedUsers[key].send(
            JSON.stringify({
              type: "CHANGE_SCREEN",
              screen: userlog.screen,
            })
          );
        }
    }
  });

  connection.on("close", function (connection) {
    console.log("SERVER : conenction closed.");
  });
});
