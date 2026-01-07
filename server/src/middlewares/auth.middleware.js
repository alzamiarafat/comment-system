const { verifyAccessToken } = require("../shared/utils/jwt.util");
const response = require("../shared/utils/response.util");

const auth = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return response.unauthorized(res, "Authorization header missing");
    }

    const token = auth.split(" ")[1];
    if (!token) {
      return response.unauthorized(res, "Access token missing");
    }

    const decoded = verifyAccessToken(token);
    req.userId = decoded.sub;
    next();
  } catch (error) {
    const errorMessage = error.message || "Invalid or expired token";
    return response.forbidden(res, errorMessage);
  }
};

module.exports = {
  auth,
};
