const authService = require("./auth.service");

const register = async (req, res) => {
  const result = await authService.register(req);
  res.status(result.statusCode).send(result);
};

const login = async (req, res) => {
  const result = await authService.login(req, res);
  res.status(result.statusCode).send(result);
};

const refresh = async (req, res) => {
  const result = await authService.refresh(req);
  res.status(result.statusCode).send(result);
};

const logout = async (req, res, next) => {
  const result = await authService.logout(req, res);
  res.status(result.statusCode).send(result);
};

const currentUser = async (req, res, next) => {
  const result = await authService.loginUser(req);
  res.status(result.statusCode).send(result);
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  currentUser,
};
