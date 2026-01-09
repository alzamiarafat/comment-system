const { Server } = require("socket.io");
const { allowedOrigins } = require("../shared/constant/constants");

let io;

exports.initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
};

exports.emitEvent = () => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
