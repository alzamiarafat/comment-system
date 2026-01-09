import React, { useState } from "react";
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
    <>
      <article className="flex gap-3">
        {comment?.author?.profilePicture ? (
          <img
            className="w-8 h-8 rounded-full"
            src={comment.author.profilePicture}
            alt={comment.author.name}
          />
        ) : (
          <FaCircleUser className="w-8 h-8 text-gray-500 items-center my-2" />
        )}
        <div className="flex-1">
          <div className="">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold">
                {comment.author?.name}
              </span>
              <div className="flex">
                <span className="text-xs text-gray-400 p-2">
                  {moment(comment.createdAt).fromNow()}
                </span>
                <span>
                  {comment?.author?._id === user?._id && (
                    <CommentDropdown
                      commentId={comment._id}
                      onEdit={() => setEditable(true)}
                    />
                  )}
                </span>
              </div>
            </div>
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
              <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
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
            <button className="flex items-center gap-1 hover:underline">
              <BsChatSquareText /> Reply
            </button>
          </div>

          {/* Nested replies recursively */}
          {comment.replies?.length > 0 && (
            <div className="mt-3 ml-4 border-l pl-4 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem
                  key={reply._id}
                  comment={reply}
                  user={user}
                  depth={depth + 1}
                />
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
