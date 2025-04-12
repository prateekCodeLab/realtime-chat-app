# Realtime Chat App

A real-time chat application built with Node.js, Express, Socket.IO, and vanilla JavaScript. Users can choose unique usernames, join chat rooms, and send messages instantly, with a responsive UI supporting light/dark modes and mobile devices.

## Features

- **Username Authentication**:
  - Users enter a unique username via a modal before joining the chat.
  - Server validates usernames (no duplicates, non-empty, <20 chars).
  - Active users stored in memory.

- **Core Chat Functionality**:
  - Send/receive messages with usernames and timestamps (e.g., "Alice: Hi! 2:30 PM").
  - Messages styled as bubbles (outgoing: blue, right; incoming: gray, left).
  - Smart auto-scroll: Scrolls to new messages only if near the bottom.
  - Prevents empty messages (disabled send button, client/server checks).

- **Room Management** (Partial):
  - Users can join predefined rooms ("General," "Tech Talk," "Random") via sidebar.
  - Room switching clears messages and updates active room styling.
  - Room creation UI exists (button/input), but creation is currently broken.

- **UI**:
  - Responsive design with collapsible sidebar, dark mode toggle (🌙/☀️), and animations.
  - Clean, modern look with Retina display support.
  - Mobile-friendly: Sidebar toggles, messages scale.

## Tech Stack

- **Backend**: Node.js, Express, Socket.IO
- **Frontend**: HTML, CSS, vanilla JavaScript
- **Dependencies**: `express`, `socket.io` (see `package.json`)
- **Storage**: In-memory (users, rooms, messages reset on server restart)

## Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/prateekCodeLab/realtime-chat-app.git
   cd realtime-chat-app
   
2. **Install dependencies**:
   ```bash
    npm install

3. **Run the server**:
   ```bash
   node server.js

4. **Access the app**:
   - Open http://localhost:3000 in a browser.
   - Enter a unique username to start chatting.


## Current Status

**The app is functional with the following completed features:**
- Username modal and server-side validation.
- Real-time messaging with usernames, timestamps, and smart scrolling.
- Joining/switching between static rooms ("General," "Tech Talk," "Random").
- Responsive UI with sidebar toggle, dark mode, and mobile support.


## Known Issues
- **Room Creation Broken**: The "Create Room" button/input is present, but submitting a new room name doesn’t create or join the room. Needs debugging (likely in create-room event handling).


## Remaining Tasks

1. **Fix Room Creation**:
   - Debug why create-room event fails (check server.js,    script.js).
   - Ensure new rooms appear in sidebar and users can join them.
   - Validate room names client-side (e.g., disable empty submits).

2. **Persistence**:
   - Store messages, users, or rooms in a file or database (e.g., MongoDB).
   - Persist rooms across server restarts.

3. **Enhanced Room Management**:
   - Add room deletion or private rooms.
   - Show user counts per room.
   - Notify users when rooms are created/updated.

4. **Advanced UI**:
   - Add user avatars, message reactions, or notifications.
   - Improve error feedback (e.g., room creation errors in UI, not alerts).
   - Style timestamps (e.g., "5 min ago").

5. **Additional Features**:
   - Typing indicators ("User is typing...").
   - "User left" notifications.
   - Message editing/deletion.
   - Username changes without reconnecting.

6. **Testing & Optimization**:
   - Stress-test with multiple users.
   - Optimize for low-bandwidth or older devices.
   - Ensure cross-browser compatibility (Safari, Chrome, Firefox).


## Developed by prateekCodeLab.