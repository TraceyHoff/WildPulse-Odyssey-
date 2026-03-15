const http = require('http');
const express = require('express');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '/')));

const roomStates = {};

io.on('connection', (socket) => {
  socket.on('join-room', (roomId) => {
    if (typeof roomId === 'object') {
        roomId = roomId.roomId;
    }

    socket.join(roomId);

    if (!roomStates[roomId]) {
        roomStates[roomId] = { nextIndex: 1, users: {} };
    }
    const rState = roomStates[roomId];

    let playerIndex = rState.nextIndex++;
    rState.users[socket.id] = playerIndex;

    socket.emit('assigned-index', playerIndex);
    socket.to(roomId).emit('user-joined', { userId: socket.id, index: playerIndex });

    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
        // Send everyone in the room to the new user
        const usersInRoom = Array.from(room).filter(id => id !== socket.id).map(id => ({
            userId: id,
            index: rState.users[id]
        }));
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
        if (roomStates[room] && roomStates[room].users) {
            delete roomStates[room].users[socket.id];
            if (Object.keys(roomStates[room].users).length === 0) {
                delete roomStates[room];
            }
        }
      }
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
