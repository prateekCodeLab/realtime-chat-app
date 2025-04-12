// Socket.IO connection
const socket = io();

// DOM elements
const usernameModal = document.getElementById('username-modal');
const usernameForm = document.getElementById('username-form');
const usernameInput = document.getElementById('username-input');
const usernameError = document.getElementById('username-error');
const chatContainer = document.getElementById('chat-container');
const roomList = document.querySelector('.room-list');
const createRoomForm = document.getElementById('create-room-form');
const roomInput = document.getElementById('room-input');
const messageArea = document.querySelector('.message-area');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-button');
const toggleSidebar = document.querySelector('.toggle-sidebar');
const sidebar = document.querySelector('.room-sidebar');
const themeToggle = document.querySelector('.theme-toggle');

// State
let currentRoom = 'General'; // Default room
let username = null;

// Handle username submission
usernameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputUsername = usernameInput.value.trim();
  if (!inputUsername) {
    usernameError.textContent = 'Please enter a username';
    return;
  }

  socket.emit('set-username', inputUsername, ({ success, message }) => {
    if (success) {
      username = inputUsername;
      usernameModal.style.display = 'none';
      chatContainer.style.display = 'flex';
      socket.emit('join-room', currentRoom);
      updateActiveRoom();
    } else {
      usernameError.textContent = message;
    }
  });
});

// Handle room creation
createRoomForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const roomName = roomInput.value.trim();
  if (!roomName) return;

  socket.emit('create-room', roomName, ({ success, message, room }) => {
    if (success) {
      currentRoom = room;
      socket.emit('join-room', currentRoom);
      messageArea.innerHTML = ''; // Clear messages
      updateActiveRoom();
      roomInput.value = ''; // Clear input
    } else {
      alert(message); // Simple error feedback
    }
  });
});

// Update room list
socket.on('update-rooms', (rooms) => {
  roomList.innerHTML = '';
  rooms.forEach((room) => {
    const li = document.createElement('li');
    li.className = 'room-item';
    li.textContent = room;
    li.classList.toggle('active', room === currentRoom);
    roomList.appendChild(li);
  });
});

// Handle room clicks
roomList.addEventListener('click', (e) => {
  if (e.target.classList.contains('room-item')) {
    currentRoom = e.target.textContent;
    socket.emit('join-room', currentRoom);
    messageArea.innerHTML = ''; // Clear messages when switching rooms
    updateActiveRoom();
  }
});

// Update active room styling
function updateActiveRoom() {
  document.querySelectorAll('.room-item').forEach((item) => {
    item.classList.toggle('active', item.textContent === currentRoom);
  });
  messageArea.scrollTop = messageArea.scrollHeight;
}

// Disable send button when input is empty
messageInput.addEventListener('input', () => {
  sendButton.disabled = !messageInput.value.trim();
});

// Send message
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !sendButton.disabled) sendMessage();
});

function sendMessage() {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('send-message', {
      room: currentRoom,
      message,
    });
    messageInput.value = '';
    sendButton.disabled = true;
  }
}

// Receive message
socket.on('receive-message', ({ username: sender, message, timestamp }) => {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender === username ? 'outgoing' : 'incoming'}`;
  messageDiv.innerHTML = `
    <span class="username">${sender}</span>: ${message}
    <span class="timestamp">${timestamp}</span>
  `;
  messageArea.appendChild(messageDiv);
  autoScroll();
});

// Receive user joined notification
socket.on('user-joined', ({ message, timestamp }) => {
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message system';
  messageDiv.innerHTML = `
    <span class="system-message">${message}</span>
    <span class="timestamp">${timestamp}</span>
  `;
  messageArea.appendChild(messageDiv);
  autoScroll();
});

// Receive error
socket.on('error', ({ message }) => {
  alert(message);
});

// Smart auto-scroll
function autoScroll() {
  const isNearBottom =
    messageArea.scrollHeight - messageArea.scrollTop - messageArea.clientHeight < 100;
  if (isNearBottom) {
    messageArea.scrollTop = messageArea.scrollHeight;
  }
}

// Sidebar toggle
toggleSidebar.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  themeToggle.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
});