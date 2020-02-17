var client = io();
client.on("connect", e => {
  console.log("Je suis " + client.id);
});
document.getElementById("envoyer").addEventListener("click", e => {
  let msg = document.getElementById("message").value;
  let username = document.querySelector("#username").value;
  client.emit("envoi_message", msg, username);
  document.querySelector("#message").value = "";
});

document.querySelector("#message").addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("envoyer").click();
  }
});

client.on("reception_message", msg => {
  console.log(msg);
  document.querySelector(".messages").innerHTML += `
  <div>${msg.user} : ${msg.msg}</div>`;
});