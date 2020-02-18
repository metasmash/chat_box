var express = require("express");
var app = express();
var http = require("http").createServer(app);
const mongo = require("mongodb").MongoClient;

// connect to mongo
mongo.connect('mongodb://127.0.0.1');

var io = require("socket.io")(http);
app.use(express.static("./node_modules"));
app.use("/scripts",express.static("./scripts"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen(5050, function() {
  console.log("listening on *:5050  ");
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
