const http = require('http');
const express = require('express');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '/')));

const globalUsers = {}; // Map of socket.id -> { name, room, index }
const roomNextIndex = {};
const roomStartTime = {};

io.on('connection', (socket) => {
  globalUsers[socket.id] = { name: 'Anonymous', room: null, index: null };
  console.log(`[Server] New connection: ${socket.id}`);

  socket.on('fetch-global-users', () => {
    const allUsers = Object.keys(globalUsers)
      .filter(id => id !== socket.id)
      .map(id => ({
        userId: id,
        name: globalUsers[id].name,
        room: globalUsers[id].room
      }));
    socket.emit('global-users', allUsers);
  });

  socket.on('join-room', async (roomId) => {
    if (typeof roomId === 'object' && roomId !== null) {
      roomId = roomId.roomId;
    }

    roomId = String(roomId || 'GLOBAL').trim().toUpperCase();
    if (!roomId) roomId = 'GLOBAL';

    console.log(`[Server] Socket ${socket.id} joining room: ${roomId}`);

    if (globalUsers[socket.id]) {
        globalUsers[socket.id].room = roomId;
    }

    await socket.join(roomId);

    // Deterministic seed generation from roomId moved to client for P2P
    // We still assign an index to help with Host designation (e.g. index 0 is Host)
    if (!roomNextIndex[roomId]) roomNextIndex[roomId] = 0;
    if (!roomStartTime[roomId]) roomStartTime[roomId] = Date.now();
    const playerIndex = roomNextIndex[roomId]++;

    if (globalUsers[socket.id]) {
        globalUsers[socket.id].index = playerIndex;
    }

    socket.emit('assigned-index', {
        index: playerIndex,
        serverNow: Date.now(),
        serverStartTime: roomStartTime[roomId]
    });

    socket.to(roomId).emit('user-joined', { userId: socket.id, index: playerIndex });

    const currentRoom = io.sockets.adapter.rooms.get(roomId);
    if (currentRoom) {
        const usersInRoom = Array.from(currentRoom).filter(id => id !== socket.id).map(id => ({
            userId: id,
            index: globalUsers[id]?.index
        }));
        socket.emit('room-users', usersInRoom);
    }
  });

  socket.on('update-identity', (data) => {
    if (globalUsers[socket.id]) {
      globalUsers[socket.id].name = data.name || 'Anonymous';
    }
  });

  socket.on('signal', (data) => {
    if (data && data.target) {
        io.to(data.target).emit('signal', {
            sender: socket.id,
            signal: data.signal
        });
    }
  });

  socket.on('disconnecting', () => {
    console.log(`[Server] Socket disconnecting: ${socket.id}`);
    const user = globalUsers[socket.id];
    if (user && user.room) {
        const roomId = user.room;
        socket.to(roomId).emit('user-left', socket.id);

        // Cleanup room metadata if room will be empty
        const room = io.sockets.adapter.rooms.get(roomId);
        if (room && room.size <= 1) {
            delete roomNextIndex[roomId];
            delete roomStartTime[roomId];
            console.log(`[Server] Cleaned up metadata for empty room: ${roomId}`);
        }
    }
    delete globalUsers[socket.id];
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
