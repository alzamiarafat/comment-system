const response = require("../../shared/utils/response.util");
const { HttpStatus } = require("../../shared/constant/httpCode");
const commentRepo = require("../../repositories/comments.repository");

const getAll = async (req) => {
  try {
    // const sortMap = {
    //   newest: { createdAt: -1 },
    //   mostLiked: { "likes.length": -1 },
    //   mostDisliked: { "dislikes.length": -1 },
    // };

    // const comments = await Comment.find({ parentComment: null })
    //   .populate("author", "username")
    //   .sort(sortMap[sort])
    //   .skip((page - 1) * limit)
    //   .limit(Number(limit));

    // res.json(comments);

    const comments = await commentRepo.findWithPaginated(req.query);
    return response.successResponse(
      HttpStatus.ok,
      "Comments fetched successfully",
      comments
    );
  } catch (error) {
    return response.failedResponse(
      HttpStatus.badRequest,
      error.message || "Failed to fetch comments",
      error
    );
  }
};

const create = async (req) => {
  try {
    const { content, parentComment } = req.body;
    if (!content) {
      throw new Error("Comment is required");
    }
    const comment = await commentRepo.create({
      content,
      parentComment: parentComment || null,
      author: req.userId,
    });

    return response.successResponse(
      HttpStatus.created,
      "Comment created successfully",
      comment
    );
  } catch (error) {
    return response.failedResponse(
      HttpStatus.badRequest,
      error.message || "Comment created failed",
      error
    );
  }
};

const update = async (req) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
      throw new Error("Comment is required");
    }
    const comment = await commentRepo.findById(id);
    if (!comment || comment.author.toString() !== req.userId.toString()) {
      throw new Error("Comment not found or not authorized to update");
    }
    const updatedComment = await commentRepo.update(id, { content });
    return response.successResponse(
      HttpStatus.ok,
      "Comment updated successfully",
      updatedComment
    );
  } catch (error) {
    return response.failedResponse(
      HttpStatus.badRequest,
      error.message || "Comment update failed",
      error
    );
  }
};

const toggleReaction = async (req) => {
  // Implementation for toggling reactions on comments
  const { id } = req.params;
  const { type } = req.body; // 'likes' or 'dislikes'
  try {
    const comment = await commentRepo.findById(id);
    if (!comment) {
      throw new Error("Comment not found");
    }
    const opposite = type === "likes" ? "dislikes" : "likes";
    comment[opposite] = comment[opposite].filter(
      (id) => id.toString() !== req.userId
    );
    if (comment[type].includes(req.userId)) {
      comment[type] = comment[type].filter(
        (id) => id.toString() !== req.userId
      );
    } else {
      comment[type].push(req.userId);
    }
    const updatedComment = await commentRepo.update(id, comment);
    return response.successResponse(
      HttpStatus.ok,
      "Reaction toggled successfully",
      updatedComment
    );
  } catch (error) {
    return response.failedResponse(
      HttpStatus.badRequest,
      error.message || "Failed to toggle reaction",
      error
    );
  }
};

const destroy = async (req) => {
  try {
    const { id } = req.params;
    const comment = await commentRepo.findById(id);
    if (!comment || comment.author.toString() !== req.userId.toString()) {
      throw new Error("Comment not found or not authorized to delete");
    }
    await commentRepo.remove(id);
    return response.successResponse(
      HttpStatus.ok,
      "Comment deleted successfully",
      {}
    );
  } catch (error) {
    return response.failedResponse(
      HttpStatus.badRequest,
      error.message || "Comment deletion failed",
      error
    );
  }
};

module.exports = {
  getAll,
  create,
  update,
  destroy,
  toggleReaction,
};
