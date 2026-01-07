const jwt = require("jsonwebtoken");

const jwtToken = {
  generateAccessToken: (id) => {
    return jwt.sign({ sub: id }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m",
    });
  },

  generateRefreshToken: (id) => {
    return jwt.sign({ sub: id }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d",
    });
  },

  verifyAccessToken: (token) => {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  },
};

module.exports = jwtToken;
