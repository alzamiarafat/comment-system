const Comment = require("../models/Comment");
const {
  paginateData,
  paginationQueryOptions,
} = require("../shared/utils/model.util");
/**
 * Maps client sort query to safe MongoDB sort fields
 */
const getSortStage = (sortBy) => {
  switch (sortBy) {
    case "mostLiked":
      return { likesCount: -1, createdAt: -1 };
    case "mostDisliked":
      return { dislikesCount: -1, createdAt: -1 };
    case "newest":
    default:
      return { createdAt: -1 };
  }
};

exports.create = async (data) => await Comment.create(data);

exports.findById = async (id) => await Comment.findById(id);

exports.findByOne = async (query) => await Comment.findOne(query);

exports.findWithPaginated = async (query) => {
  const sortBy = query.sort || "newest";

  query.sortStage = getSortStage(sortBy);
  const filterTopLevel = query.filterTopLevel === "true";

  const matchStage = filterTopLevel ? { parentComment: null } : {};

  const pipeline = [
    { $match: matchStage },
    {
      $addFields: {
        likesCount: { $size: { $ifNull: ["$likes", []] } },
        dislikesCount: { $size: { $ifNull: ["$dislikes", []] } },
      },
    },
  ];

  const queryOptions = paginationQueryOptions(query, pipeline);

  const comments = await Comment.aggregate(queryOptions);
  return paginateData(query, comments);
};

exports.update = async (id, data) =>
  await Comment.findByIdAndUpdate(id, data, { new: true });

exports.remove = async (id) => await Comment.findByIdAndDelete(id);
