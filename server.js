const http = require('http');
const express = require('express');
const { Server } = require("socket.io");
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '/')));

const roomStates = {};
const globalUsers = {}; // Map of socket.id -> { name, room }

io.on('connection', (socket) => {
  globalUsers[socket.id] = { name: 'Anonymous', room: null };
  console.log(`[Server] New connection: ${socket.id}`);

  socket.on('fetch-global-users', () => {
    // Return all online users to allow global discovery
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

    if (!roomStates[roomId]) {
        // Generate deterministic seed from roomId
        let hash = 0;
        const roomStr = String(roomId);
        for (let i = 0; i < roomStr.length; i++) {
            hash = roomStr.charCodeAt(i) + ((hash << 5) - hash);
        }
        const deterministicSeed = Math.abs(hash) || 123456789;

        roomStates[roomId] = {
            nextIndex: 0,
            users: {}, // socket.id -> { index, identity, pos }
            startTime: Date.now(),
            roomSeed: deterministicSeed
        };
        console.log(`[Server] Created new room state for ${roomId} with seed ${deterministicSeed}`);
    }
    const rState = roomStates[roomId];

    let playerIndex = rState.nextIndex++;
    rState.users[socket.id] = {
        index: playerIndex,
        identity: null,
        pos: null
    };

    socket.emit('assigned-index', {
        index: playerIndex,
        startTime: rState.startTime,
        roomSeed: rState.roomSeed,
        serverNow: Date.now()
    });
    socket.to(roomId).emit('user-joined', { userId: socket.id, index: playerIndex });

    const room = io.sockets.adapter.rooms.get(roomId);
    if (room) {
        // Send everyone in the room to the new user, including their last known state
        const usersInRoom = Array.from(room).filter(id => id !== socket.id).map(id => ({
            userId: id,
            index: rState.users[id]?.index,
            identity: rState.users[id]?.identity,
            pos: rState.users[id]?.pos
        }));
        socket.emit('room-users', usersInRoom);
    }
  });


  socket.on('update-identity', (data) => {
    if (globalUsers[socket.id]) {
      globalUsers[socket.id].name = data.name || 'Anonymous';
    }
  });

  socket.on('chat-message', (data) => {
    const user = globalUsers[socket.id];
    if (!user || !user.room) return;

    const chatPayload = {
      sender: socket.id,
      senderName: user.name,
      text: data.text,
      timestamp: Date.now()
    };

    // Broadcast to the user's room
    io.to(user.room).emit('chat-message', chatPayload);
  });

  socket.on('player-data', (data) => {
    // Track identity updates
    if (data && data.type === 'identity' && globalUsers[socket.id]) {
        globalUsers[socket.id].name = data.name || 'Anonymous';
    }

    // Update server-side room state for better join sync
    const user = globalUsers[socket.id];
    if (user && user.room && roomStates[user.room]) {
        const rState = roomStates[user.room];
        if (rState.users[socket.id]) {
            if (data.type === 'identity') {
                rState.users[socket.id].identity = data;
            } else if (data.type === 'pos') {
                rState.users[socket.id].pos = data;
            }
        }
    }

    if (data && data.target) {
        // Targeted message (Private message)
        io.to(data.target).emit('player-data', {
            sender: socket.id,
            msg: data
        });
    } else {
        // Broadcast to all rooms this socket is in (except its own ID room)
        const myRooms = Array.from(socket.rooms).filter(r => r !== socket.id);
        myRooms.forEach(roomId => {
            socket.to(roomId).emit('player-data', {
                sender: socket.id,
                msg: data
            });
        });
    }
  });

  socket.on('disconnecting', () => {
    console.log(`[Server] Socket disconnecting: ${socket.id}`);
    delete globalUsers[socket.id];
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit('user-left', socket.id);
        if (roomStates[room] && roomStates[room].users) {
            delete roomStates[room].users[socket.id];
            if (Object.keys(roomStates[room].users).length === 0) {
                console.log(`[Server] Room ${room} is empty, cleaning up.`);
                delete roomStates[room];
            }
        }
      }
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
