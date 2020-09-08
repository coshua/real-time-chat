const socket = io(); //It emits 'connection' event

const message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  output = document.getElementById("output"),
  typing = document.getElementById("typing"),
  button = document.getElementById("button");

//Send typing event 'userTyping'
message.addEventListener("keypress", () => {
  socket.emit("userTyping", handle.value);
});

//When press send, it sends our name and message with the event name 'click'
button.addEventListener("click", (e) => {
  e.preventDefault();
  socket.emit("userMessage", {
    handle: handle.value,
    message: message.value,
  });

  message.value = "";
});

socket.on("userMessage", (data) => {
  typing.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
});

socket.on("userTyping", (data) => {
  typing.innerHTML = "<p><em>" + data + " is typing</em></p>";
});

socket.on("userDisconnect", (data) => {
  typing.innerHTML = data + " has left the room.";
});
