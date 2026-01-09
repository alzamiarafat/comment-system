import React, { useState, useRef, useEffect } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { BsChatSquareText } from "react-icons/bs";
import { FaCircleUser } from "react-icons/fa6";
import {
  AiFillLike,
  AiOutlineLike,
  AiFillDislike,
  AiOutlineDislike,
} from "react-icons/ai";
import CommentDropdown from "./CommentDropDown";
import { reactionCommentById, updateCommentById } from "../comment.action";
import ReactionButton from "./ReactionButton";

export default function CommentItem({ comment, user, onReply, depth = 0 }) {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState(comment.content);

  const isLiked = comment.likes?.includes(user?._id);
  const isDisliked = comment.dislikes?.includes(user?._id);

  const onReaction = (type) => {
    dispatch(reactionCommentById({ id: comment._id, type }));
  };

  const onUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateCommentById({
        id: comment._id,
        content,
      })
    );
    setEditable(false);
  };

  return (
    <div className={`relative mb-6 ${depth > 0 ? "ml-8" : ""}`}>
      {/* Vertical line for threading */}
      {depth > 0 && (
        <span
          className="absolute top-0 left-2 h-full w-0.5 bg-gray-300 dark:bg-gray-600"
          style={{ marginLeft: `${depth * 16}px` }}
        />
      )}

      <article className="p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 relative z-10">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            {comment?.author?.profilePicture ? (
              <img
                className="mr-2 w-6 h-6 rounded-full"
                src={comment.author.profilePicture}
                alt={comment.author.name}
              />
            ) : (
              <FaCircleUser className="mr-2 w-8 h-8 text-gray-500" />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {comment?.author?.name || "Unknown"}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {moment(comment?.createdAt).format("MMM D, YYYY h:mm A")}
              </span>
            </div>
          </div>
          {comment?.author?._id === user?._id && (
            <CommentDropdown
              commentId={comment._id}
              onEdit={() => setEditable(true)}
            />
          )}
        </footer>
        {editable ? (
          <>
            <form onSubmit={onUpdate}>
              <textarea
                value={content}
                name="content"
                rows="3"
                placeholder="Write a comment..."
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm"
                onChange={(e) => setContent(e.target.value)} // Allows typing
              />
              <div className="flex gap-2 mt-2">
                <button className="text-sm px-3 py-1 bg-sky-600 text-white rounded">
                  Edit
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    setEditable(false);
                  }}
                  className="text-sm px-3 py-1 text-gray-500 border"
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
        )}

        <div className="flex items-center mt-2 space-x-1 text-sm">
          <ReactionButton
            count={comment.likesCount}
            isActive={isLiked}
            onAction={() => onReaction("likes")}
            ActiveIcon={AiFillLike}
            InactiveIcon={AiOutlineLike}
            activeColorClass="text-blue-600"
          />

          <ReactionButton
            count={comment.dislikesCount}
            isActive={isDisliked}
            onAction={() => onReaction("dislikes")}
            ActiveIcon={AiFillDislike}
            InactiveIcon={AiOutlineDislike}
            activeColorClass="text-red-600"
          />

          <button
            className="flex items-center p-2 text-md text-gray-500"
            onClick={() => onReply(comment._id)}
          >
            <BsChatSquareText className="mr-1.5 w-5 h-5" />
            <span>Reply</span>
          </button>
        </div>
      </article>

      {/* Nested replies recursively */}
      {comment.replies?.length > 0 && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              user={user}
              onReply={onReply}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
