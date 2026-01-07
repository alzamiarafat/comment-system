const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },

    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],

    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  { timestamps: true }
);

CommentSchema.plugin(mongoosePaginate);
const Comment = model("Comment", CommentSchema);
module.exports = Comment;
