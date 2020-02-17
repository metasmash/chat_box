var express = require("express");
var app = express();
var http = require("http").createServer(app);

var io = require("socket.io")(http);
app.use(express.static("./node_modules"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

http.listen(5050, function() {
  console.log("listening on *:3000");
});

io.on("connection", function(client) {
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
//git --work-tree=/var/www/html/chatbox --git-dir=/var/repo/chatbox.git checkout -f
