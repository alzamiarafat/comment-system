const response = require("../../shared/utils/response.util");
const { HttpStatus } = require("../../shared/constant/httpCode");
const userRepo = require("../../repositories/users.repository");

const getById = async (req) => {
  try {
    const userId = req.userId || req.params.id;
    const user = await userRepo.findById(userId);
    return response.successResponse(
      HttpStatus.ok,
      "User fetched successfully",
      user
    );
  } catch (error) {
    return response.failedResponse(
      HttpStatus.badRequest,
      error.message || "Failed to fetch user",
      error
    );
  }
};

module.exports = {
  getById,
};
