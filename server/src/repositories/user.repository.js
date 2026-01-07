const User = require("../models/User");

exports.create = (data) => User.create(data);

exports.findById = (id) => User.findById(id);

exports.findByOne = (query) => {
  console.log("🚀 ~ query:", query);
  return User.findOne(query);
};

exports.findByEmailOrUsernameWithPassword = (loginIdentifier) => {
  return User.findOne({
    $or: [{ email: loginIdentifier }, { username: loginIdentifier }],
  }).select("+password +refreshToken");
};

exports.findPaginated = (sort, skip, limit) =>
  User.aggregate([
    {
      $addFields: {
        likesCount: { $size: "$likes" },
        dislikesCount: { $size: "$dislikes" },
      },
    },
    { $sort: sort },
    { $skip: skip },
    { $limit: limit },
  ]);

exports.update = (id, data, withRefreshToken = false) =>
  User.findByIdAndUpdate(id, data, { new: true }).select(
    withRefreshToken ? "+refreshToken" : ""
  );
