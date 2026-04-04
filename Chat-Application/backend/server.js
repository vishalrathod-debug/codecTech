const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("your_mongodb_connection");

const Message = mongoose.model("Message", {
  room: String,
  author: String,
  message: String,
  time: String
});

app.get('/messages/:room', async (req, res) => {
  const messages = await Message.find({ room: req.params.room });
  res.json(messages);
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on("connection", (socket) => {
  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("send_message", async (data) => {
    await Message.create(data);
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(3001, () => {
  console.log("Chat server running");
});
