# Realtime Chat App

A real-time chat application built with Node.js, Express, Socket.IO, and vanilla JavaScript. Users can choose unique usernames, create and join chat rooms, and send messages instantly, with a responsive UI supporting light/dark modes and mobile devices.

## Features

- **Username Authentication**:
  - Users enter a unique username via a modal before joining (max 20 chars, no duplicates).
  - Server-side validation with error feedback.

- **Core Chat Functionality**:
  - Real-time messaging with usernames and timestamps (e.g., "Anshu: hii 9:34 PM").
  - Message bubbles (outgoing: blue, incoming: gray, system: centered).
  - Smart auto-scroll: Scrolls to new messages only if near bottom.
  - Prevents empty messages (disabled send button, client/server checks).

- **Room Management**:
  - Join predefined rooms ("General," "Tech Talk," "Random") or create custom rooms (e.g., "AKKK").
  - Room switching clears messages and updates active room styling.
  - Dynamic room list synced across users.

- **UI**:
  - Responsive design with collapsible sidebar, dark/light mode toggle (🌙/☀️), and animations.
  - Mobile-friendly: Sidebar slides in/out, messages scale (80% width).
  - Clean, modern look with Retina display support.

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


Developed by prateekCodeLab.