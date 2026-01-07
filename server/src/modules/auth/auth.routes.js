// const { authGuard } = require("../middlewares/authMiddleware");

const authControllers = require("./auth.controller");

module.exports = (router) => {
  router.post("/auth/register", authControllers.register);
  router.post("/auth/login", authControllers.login);
  router.post("/auth/refresh", authControllers.refresh);
  router.post("/auth/logout", authControllers.logout);
  //   router.post("/api/auth/forgot-password", authControllers.forgotPassword);
  //   router.post("/api/auth/reset-password", authControllers.resetPassword);
};
