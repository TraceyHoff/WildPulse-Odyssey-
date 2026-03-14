const http = require('http');
const express = require('express');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '/')));

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
        // Send everyone in the room to the new user
        const usersInRoom = Array.from(room).filter(id => id !== socket.id);
        socket.emit('room-users', usersInRoom);
    }
  });

  socket.on('signal', (data) => {
    io.to(data.target).emit('signal', {
      sender: socket.id,
      signal: data.signal
    });
  });

  socket.on('disconnecting', () => {
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit('user-left', socket.id);
      }
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
