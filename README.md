# Full-Stack Authentication and Real-Time Comment System

This repository contains a **full-stack web application** implementing secure authentication and real-time comment functionality.
The system is designed using **modular architecture**, with a clear separation of concerns and scalability in mind.

---

## Overview

The application provides a secure JWT-based authentication system combined with a real-time comment feature powered by WebSockets.  
The backend exposes RESTful APIs and real-time events, while the frontend delivers a modern, responsive user experience using React and Redux.

---

## Features

### Authentication
- User registration, login, and logout
- JWT-based access control
- Protected API endpoints
- Client-side route protection

### Real-Time Comments
- Create, update, and delete comments
- Like and dislike reactions
- Pagination and sorting support
- Instant updates via Socket.io

### Architecture & Performance
- Modular backend design
- Separation of application and server initialization
- Single HTTP server for REST and WebSocket traffic
- Lazy-loaded routes and components
- Centralized state management with Redux

---

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Socket.io

### Frontend
- React (18+)
- Redux
- React Router
- Axios
- Tailwind CSS

---

## Installation and Setup

### Clone the Repository
```bash
# Clone the repository from GitHub
git clone https://github.com/alzamiarafat/comment-system

# Navigate into the project directory
cd comment-system
```
## Backend
```bash 
cd server
```
Create a `.env` file in the backend directory:

```bash
PORT=5000
MONGO_DB_URI=
JWT_ACCESS_SECRET=your_jwt_access_secret_key
JWT_ACCESS_EXPIRES=24h
JWT_REFRESH_SECRET=your_jwt_refresh_secret_key
JWT_REFRESH_EXPIRES=7d
```

Install backend dependencies
```bash
npm install
npm run dev
```

---

### Frontend

Create a `.env` file inside the `frontend` folder:
```bash
REACT_APP_API_URL=http://localhost:5000
```

Install frontend dependencies

```bash
npm install
npm start
```
- Backend API available at: `http://localhost:5000`

- Frontend application available at: `http://localhost:3000`

---

### Real-Time Communication

- WebSocket communication is implemented using Socket.io

- REST APIs and WebSockets share a single HTTP server

- The system is designed to support future scaling with adapters such as Redis

----

### Design Principles

- Clear separation of concerns

- Secure authentication practices

- Scalable real-time architecture

- Clean, maintainable, and testable codebase

---
 
### License

MIT License
