var client = io();
var sendBtn = document.getElementById("envoyer");
var send = true;

var map = {}; // You could also use an array
onkeydown = onkeyup = function(e) {
  e = e || event; // to deal with IE
  map[e.keyCode] = e.type == "keydown";
  if (map[16]) {
    send = false;
  } else {
    send = true;
  }
};

client.on("connect", e => {
  console.log("Je suis " + client.id);
});

sendBtn.addEventListener("click", e => {
  let msg = document.querySelector("#message").value;
  let username = document.querySelector("#username").value;
  client.emit("envoi_message", msg, username);
  document.querySelector("#message").value = "";
});

document.querySelector("#message").addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13 && send === true) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("envoyer").click();
  }
});

client.on("reception_message", msg => {
  console.log(msg);
  document.querySelector("#messages_box").innerHTML +=
    '<div class="last_message"style="color:white"></div>';
  let len = document.querySelectorAll(".last_message").length;
  document.querySelectorAll(".last_message")[len - 1].textContent += `
${msg.user} : ${msg.msg}`;
});
