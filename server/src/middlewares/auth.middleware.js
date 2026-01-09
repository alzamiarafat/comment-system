const { verifyAccessToken } = require("../shared/utils/jwt.util");
const response = require("../shared/utils/response.util");
const userService = require("../modules/users/user.service");

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
    const user = await userService.getById(req);
    if (!user.data) {
      return response.unauthorized(res, "Unauthorized user");
    }
    req.user = { ...user.data._doc };
    next();
  } catch (error) {
    const errorMessage = error.message || "Invalid or expired token";
    return response.forbidden(res, errorMessage);
  }
};

module.exports = {
  auth,
};
