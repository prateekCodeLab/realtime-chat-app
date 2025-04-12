const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static('.'));

// Store active users and rooms (in memory)
const activeUsers = {};
const rooms = ['General', 'Tech Talk', 'Random']; // Default rooms

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send current rooms to new client
  socket.emit('update-rooms', rooms);

  // Handle username validation
  socket.on('set-username', (username, callback) => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername) {
      callback({ success: false, message: 'Username cannot be empty' });
      return;
    }
    if (trimmedUsername.length > 20) {
      callback({ success: false, message: 'Username too long (max 20 characters)' });
      return;
    }
    if (activeUsers[trimmedUsername]) {
      callback({ success: false, message: 'Username already taken' });
      return;
    }
    // Store username
    activeUsers[trimmedUsername] = socket.id;
    socket.username = trimmedUsername;
    console.log(`Username set: ${trimmedUsername} (${socket.id})`);
    callback({ success: true });
  });

  // Handle room creation
  socket.on('create-room', (roomName, callback) => {
    const trimmedRoom = roomName.trim();
    if (!trimmedRoom) {
      callback({ success: false, message: 'Room name cannot be empty' });
      return;
    }
    if (trimmedRoom.length > 30) {
      callback({ success: false, message: 'Room name too long (max 30 characters)' });
      return;
    }
    if (rooms.includes(trimmedRoom)) {
      callback({ success: false, message: 'Room already exists' });
      return;
    }
    rooms.push(trimmedRoom);
    console.log(`Room created: ${trimmedRoom}`);
    io.emit('update-rooms', rooms); // Broadcast to all clients
    callback({ success: true, room: trimmedRoom });
  });

  // Handle joining a room
  socket.on('join-room', (room) => {
    if (!socket.username || !rooms.includes(room)) return; // Validate username and room
    socket.join(room);
    console.log(`User ${socket.username} joined room: ${room}`);
    // Notify others in the room
    socket.to(room).emit('user-joined', {
      message: `${socket.username} has joined the room`,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  // Handle incoming messages
  socket.on('send-message', ({ room, message }) => {
    if (!socket.username || !rooms.includes(room)) return; // Validate
    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      socket.emit('error', { message: 'Message cannot be empty' });
      return;
    }
    console.log(`Message in ${room} from ${socket.username}: ${trimmedMessage}`);
    // Broadcast message to everyone in the room
    io.to(room).emit('receive-message', {
      username: socket.username,
      message: trimmedMessage,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    if (socket.username) {
      delete activeUsers[socket.username];
      console.log(`User disconnected: ${socket.username} (${socket.id})`);
    }
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});