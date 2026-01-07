const User = require("../models/User");

exports.create = async (data) => await User.create(data);

exports.findById = async (id) => await User.findById(id);

exports.findByOne = async (query) => await User.findOne(query);

exports.findByEmailOrUsernameWithPassword = async (loginIdentifier) => {
  return await User.findOne({
    $or: [{ email: loginIdentifier }, { username: loginIdentifier }],
  }).select("+password +refreshToken");
};

exports.update = async (id, data, withRefreshToken = false) => {
  return await User.findByIdAndUpdate(id, data, { new: true }).select(
    withRefreshToken ? "+refreshToken" : ""
  );
};
