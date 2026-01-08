const fs = require("fs");
const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const { InfoLog, ErrorLog } = require("./config/logger");
const { logDefinedRoutes } = require("./shared/utils/logger.util");
const { allowedOrigins } = require("./shared/constant/constants");

dotenv.config();
const app = express();

const corsConfig = {
  origin: function (_origin, callback) {
    return callback(null, true);
  },
  // origin: allowedOrigins,
  credentials: true,
};
app.use(cors(corsConfig));

app.use(express.json());
app.use(cookieParser());

const apiRouter = express.Router();
app.use("/api", apiRouter);

connectDB();

app.get("/status", (req, res) => {
  res.send("Server is okay.");
});

// Load all modules
require("./app.module")(apiRouter);

// Log all defined routes after they are loaded
const definedRoutes = logDefinedRoutes(app);
definedRoutes.forEach((route, index) => {
  InfoLog(`Route`, `${route.methods.join(", ")} '/api${route.path}'`, "Routes");
});

app.use(errorHandler.invalidPathHandler);
app.use(errorHandler.errorResponserHandler);

const port = process.env.PORT;
app.listen(port, (err) => {
  if (err) {
    ErrorLog("Failed to start server", err, "Server");
    process.exit(1);
  }
  InfoLog(`Service is running at port: ${port}`, null, "Server");
});
