const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require("socket.io");

const PORT = 3000;

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html';

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error: ' + error.code);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        console.log(`user ${socket.id} joined room ${roomId}`);

        // Notify others in the room
        socket.to(roomId).emit('user-joined', socket.id);

        // Send list of existing users to the new user
        const clients = io.sockets.adapter.rooms.get(roomId);
        const users = clients ? Array.from(clients).filter(id => id !== socket.id) : [];
        socket.emit('room-users', users);

        // Store room id for disconnect handling
        socket.roomId = roomId;
    });

    socket.on('signal', (data) => {
        // Send the signal to the specific target peer
        io.to(data.target).emit('signal', {
            sender: socket.id,
            signal: data.signal
        });
    });

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        if (socket.roomId) {
            socket.to(socket.roomId).emit('user-left', socket.id);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
