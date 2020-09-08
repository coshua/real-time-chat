const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const PORT = process.env.PORT || 3020;

http.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static("public")); //folder client lives, they now could be executed by our app

//When client connects, event emits
io.on("connection", (socket) => {
  console.log("Client is connected " + socket.id);

  //Broadcast
  socket.on("userMessage", (data) => {
    io.emit("userMessage", data);
  });
  socket.on("userTyping", (data) => {
    io.emit("userTyping", data);
  });

  socket.on("disconnect", () => {
    io.emit("userDisconnect", socket.id);
  });
});
