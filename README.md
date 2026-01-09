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

## Environment Configuration

## Backend
cd backend
Create a `.env` file in the backend directory:

PORT=5000
MONGO_URI=mongodb://localhost:27017/app
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret


# Install backend dependencies
npm install
npm run dev


### Frontend `.env`

Create a `.env` file inside the `frontend` folder:

REACT_APP_API_URL=http://localhost:5000/

# Install frontend dependencies

npm install
npm start


---

If you want, I can **also make a slightly shorter “GitHub-ready version” with badges, quick setup, and professional formatting**, so it looks like a polished open-source project page.  

Do you want me to do that next?


