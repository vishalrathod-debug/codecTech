require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const connectDB = require('./config/db');
const Message = require('./models/Message');

const app = express();
app.use(cors());
app.use(express.json());

// DB
connectDB();

// API route
app.get('/messages/:room', async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room })
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

const server = http.createServer(app);

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
  console.log("User Connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("send_message", async (data) => {
    try {
      const saved = await Message.create(data);

      io.to(data.room).emit("receive_message", {
        ...data,
        createdAt: saved.createdAt
      });

    } catch (err) {
      console.error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
