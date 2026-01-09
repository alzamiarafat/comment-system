const { HttpStatus } = require("../../shared/constant/httpCode");
const userRepo = require("../../repositories/users.repository");
const response = require("../../shared/utils/response.util");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../../shared/utils/jwt.util");
const { comparePassword } = require("../../shared/utils/hash.util");

const register = async (req) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      throw new Error("Required fields are missing.");
    }

    const userExists = await userRepo.findByOne({ email });
    if (userExists) throw new Error("User already exists");

    const user = await userRepo.create({ username, email, password });
    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    return response.successResponse(
      HttpStatus.created,
      "User created successfully",
      responseData
    );
  } catch (error) {
    return response.failedResponse(
      HttpStatus.badRequest,
      error.message || "User created failed",
      error
    );
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new Error("Required fields are missing");

    const user = await userRepo.findByEmailOrUsernameWithPassword(username);
    if (!user) throw new Error("Invalid credentials");

    const match = await comparePassword(password, user.password);
    if (!match) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const updatedUser = await userRepo.update(user.id, { refreshToken }, true);
    if (!updatedUser.refreshToken) throw new Error("Failed to login user");

    res.cookie("refreshToken", updatedUser.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    delete user._doc.password;
    delete user._doc.__v;
    return response.successResponse(
      HttpStatus.ok,
      "User logged in successfully",
      { ...user._doc, accessToken, refreshToken }
    );
  } catch (error) {
    return response.failedResponse(
      HttpStatus.badRequest,
      error.message || "User login failed",
      error
    );
  }
};

const refresh = async (req) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) throw new Error("User not logged in");

    const user = await userRepo.findByOne({ refreshToken });
    if (!user) throw new Error("Invalid refresh token");

    return response.successResponse(
      HttpStatus.ok,
      "User refreshed successfully",
      { accessToken: generateAccessToken(user.id) }
    );
  } catch (error) {
    return response.failedResponse(
      HttpStatus.badRequest,
      error.message || "User refresh failed",
      error
    );
  }
};

const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const user = await userRepo.findByOne({ refreshToken });
    if (!user) throw new Error("Invalid refresh token");

    await userRepo.update(user.id, { refreshToken: null });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return response.successResponse(
      HttpStatus.ok,
      "User logged out successfully",
      null
    );
  } catch (error) {
    return response.failedResponse(
      HttpStatus.badRequest,
      error.message || "User logout failed",
      error
    );
  }
};

const loginUser = async (req) => {
  return response.successResponse(
    HttpStatus.ok,
    "Login User Fetch successfully",
    { ...req.user }
  );
};

module.exports = {
  register,
  login,
  refresh,
  logout,
  loginUser,
};
