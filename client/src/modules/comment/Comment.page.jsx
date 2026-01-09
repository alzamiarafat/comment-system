import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewComment, getComments } from "./comment.action";
import Sidebar from "../../components/Sidebar";
import PageLoader from "../../components/common/PageLoader";
import CommentItem from "./components/CommentItem";
import CommentPagination from "./components/CommentPagination";
import Navbar from "../../components/Navbar";
import Select from "../../components/inputs/Select";
import useCommentSocket from "./comment.socket";

export default function CommentPage() {
  const options = [
    { value: "newest", text: "Newest" },
    { value: "mostLiked", text: "Most Liked" },
    { value: "mostDisliked", text: "Most Disliked" },
  ];
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { comments, totalPages, page, status } = useSelector(
    (state) => state.comments
  );

  const [sort, setSort] = useState("newest");
  const [limit, setLimit] = useState(10);
  const [replyTo, setReplyTo] = useState(null);

  useCommentSocket();

  useEffect(() => {
    dispatch(getComments({ page, sort, limit }));
  }, [dispatch, page, sort, limit]);

  if (status === "loading") return <PageLoader />;
  if (!comments?.length)
    return (
      <p className="text-center py-10 text-gray-500 dark:text-gray-400">
        No comments yet.
      </p>
    );

  const handlePageChange = (newPage) =>
    dispatch(getComments({ page: newPage, sort, limit }));
  const handleSortChange = (e) => setSort(e.target.value);
  const handleLimitChange = (e) => setLimit(Number(e.target.value));
  const handleReply = (commentId) => setReplyTo(commentId);

  const submitComment = (e) => {
    e.preventDefault();
    const content = e.target.content.value.trim();
    if (!content) return;
    dispatch(addNewComment({ content, parentId: replyTo }));
    e.target.reset();
    setReplyTo(null);
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <>
      {/* Navbar Mobile view */}
      <Navbar />

      <section className="bg-gray-50 dark:bg-black min-h-screen flex">
        <Sidebar user={user} />
        {/* Main content */}
        <main className="flex-1 p-8 md:ml-72 transition-all duration-300">
          <div className="bg-white h-20 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-semibold text-gray-900 dark:text-white">
                Comments
              </h2>
            </div>
          </div>

          <div className="p-4">
            {/* Sorting & Limit */}
            <div className="flex flex-wrap justify-end items-center gap-2">
              <Select
                label="Sort by"
                defaultValue={sort}
                handleOnChange={handleSortChange}
                options={options}
              />
              <Select
                label="Per page"
                defaultValue={limit}
                handleOnChange={handleLimitChange}
                options={[
                  { value: 10, text: 10 },
                  { value: 20, text: 20 },
                  { value: 50, text: 50 },
                  { value: 100, text: 100 },
                ]}
              />
            </div>
          </div>

          {/* Comment Form */}
          <form onSubmit={submitComment} className="mb-6 space-y-2">
            {replyTo && (
              <div className="flex justify-between items-center px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 rounded-md">
                Replying to #{replyTo}
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                  className="text-red-500 hover:underline text-xs"
                >
                  Cancel
                </button>
              </div>
            )}
            <textarea
              name="content"
              rows="5"
              placeholder="Write a comment..."
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm"
            />
            <button
              type="submit"
              className="px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition"
            >
              {replyTo ? "Reply" : "Post Comment"}
            </button>
          </form>

          {/* Comments */}
          <div className="space-y-3">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                user={user}
                onReply={handleReply}
                compact={true}
              />
            ))}
          </div>

          {/* Pagination */}
          <CommentPagination
            pages={pages}
            currentPage={page}
            handlePageChange={handlePageChange}
          />
        </main>
      </section>
    </>
  );
}
