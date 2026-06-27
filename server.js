const http = require('http');
const express = require('express');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '/')));

const roomStates = {};
const globalUsers = {}; // Map of socket.id -> global status

io.on('connection', (socket) => {
  globalUsers[socket.id] = true;

  socket.on('fetch-global-users', () => {
     // Return only users in the same rooms as the requester to improve isolation
        const myRooms = Array.from(socket.rooms).filter(r => r !== socket.id);
    const usersSet = new Set();
    myRooms.forEach(roomId => {
        const room = io.sockets.adapter.rooms.get(roomId);
        if (room) {
            room.forEach(id => {
                if (id !== socket.id) usersSet.add(id);
            });
        }
    });
    socket.emit('global-users', Array.from(usersSet));
  });

  socket.on('join-room', async (roomId) => {
    if (typeof roomId === 'object') {
        roomId = roomId.roomId;
    }

    await socket.join(roomId);

    if (!roomStates[roomId]) {
        // Generate deterministic seed from roomId
        let hash = 0;
        const roomStr = String(roomId);
        for (let i = 0; i < roomStr.length; i++) {
            hash = roomStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        const deterministicSeed = Math.abs(hash) || 123456789;

        roomStates[roomId] = {
            nextIndex: 1,
            users: {},
            startTime: Date.now(),
            roomSeed: deterministicSeed
        };
    }
    const rState = roomStates[roomId];

    let playerIndex = rState.nextIndex++;
    rState.users[socket.id] = playerIndex;

    socket.emit('assigned-index', {
        index: playerIndex,
        startTime: rState.startTime,
        roomSeed: rState.roomSeed,
        serverNow: Date.now()
    });
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

  socket.on('player-data', (data) => {
    // Relay to all rooms this socket is in (except its own ID room)
    const myRooms = Array.from(socket.rooms).filter(r => r !== socket.id);
    myRooms.forEach(roomId => {
        socket.to(roomId).emit('player-data', {
            sender: socket.id,
            msg: data
        });
    });
  });

  socket.on('disconnecting', () => {
    delete globalUsers[socket.id];
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
