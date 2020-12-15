//Node.js file
const webSocketsServerPort = require("../ServerUtils").WebSocketServerPort;
const TEMP_KEYGAME = "123";
var WebSocketServer = require("websocket").server;
var http = require("http");
var d_connections = {};
var d_users = {};
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

const clients = {};

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
    switch(userlog.type){
      case "REQ_USER_LOGIN":
        if (userlog.keygame === TEMP_KEYGAME) {
          d_connections[userID] = connection;
          d_users[userID] = [userlog.name, 0 ];
          console.log(userlog.name + " successfuly logged in with userId " + userID);
          console.log("users are -> " + Object.keys(d_connections));
          console.log("There are " + Object.keys(d_users).length + " users");
        } else {
          console.log("Bad password insertion from " + userlog.name);
        }break;

        case "RAISE_SCORE":
          d_connections[userID] = connection;
          d_users[userID][1] += 1;
          console.log("----------------- Score Status ----------------")
          console.log(d_users);
          break;
    }
  });

  connection.on("close", function (connection) {
    delete d_connections[userID];
    delete d_users[userID];
    console.log("SERVER : conenction closed.");
  });
});
