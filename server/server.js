var express = require("express");
var app = express();
var http = require("http").createServer(app);

var path = require('path');

// const mongo = require("mongodb").MongoClient;
const PORT = 5000

// connect to mongo
// mongo.connect('mongodb://127.0.0.1');

var io = require("socket.io")(http);
app.use("/src",express.static("./../client/node_modules"));
app.use("/dep",express.static("./../client/src"));

app.get("/", function(req, res) {
  res.sendFile(path.resolve('../client/index.html'));
});

http.listen(PORT, function() {
  console.log(`The server is up an running on http://localhost:${PORT}`);
});

io.on("connection", function(client) {
  console.log("client connected : " + client.id);

  client.on("disconnect", function() {
    console.log("user disconnected");
  });

  client.on("envoi_message", (msg, username) => {
    io.emit("reception_message", {
      user: username,
      msg: msg
    });
  });
});
