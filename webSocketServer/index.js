const webSocketsServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");

// Spinning the http server and the websocket server.
const server = http.createServer(function () {
  console.log("CONNECTED");
});
server.listen(webSocketsServerPort);
console.log("listening on port 8000");
const wsServer = new webSocketServer({
  httpServer: server,
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
  clients[userID] = connection;
  console.log(
    "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  );
  connection.on("message", function (message) {
    console.log(message);
    console.log(message.utf8Data);

    if (message.type === "VALIDATION") {
      console.log(userID, message.utf8Data);
    }
  });
});
