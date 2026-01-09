import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewComment, getComments } from "./comment.action";
import Sidebar from "../../components/Sidebar";
import PageLoader from "../../components/common/PageLoader";
import CommentItem from "./components/CommentItem";
import CommentLoadMore from "./components/CommentLoadMore";
import Navbar from "../../components/Navbar";
import Select from "../../components/inputs/Select";
import useCommentSocket from "./comment.socket";
import CommentPost from "./components/CommentPost";

export default function CommentPage() {
  const options = [
    { value: "newest", text: "Newest" },
    { value: "mostLiked", text: "Most Liked" },
    { value: "mostDisliked", text: "Most Disliked" },
  ];
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { comments, totalPages, status } = useSelector(
    (state) => state.comments
  );
  const [page, setPage] = useState(1); // Track current page locally

  const [sort, setSort] = useState("newest");
  const [limit, setLimit] = useState(5);
  const [replyTo, setReplyTo] = useState(null);

  useCommentSocket();

  useEffect(() => {
    dispatch(getComments({ page, sort, limit }));
  }, [dispatch, page, sort, limit]);

  // if (status === "loading") return <PageLoader />;
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
  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-5">
        <Navbar />
        <section className="flex flex-col md:flex-row p-4 md:p-8 gap-10 dark:bg-black">
          <Sidebar user={user} />
          <main className="flex-1 transition-all">
            {/* Header section... */}
            <h1 className="text-3xl font-bold pb-3">Comments</h1>
            <CommentPost
              handleComment={submitComment}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
            />

            <div className="space-y-3 bg-white mt-5 p-4 rounded-b-md border-x border-b">
              {/* Sorting */}
              <div className="flex justify-between items-center px-2 mb-4">
                <Select
                  defaultValue={sort}
                  handleOnChange={handleSortChange}
                  options={options}
                />
                <span className="text-xs text-gray-400">
                  Showing {comments.length} comments
                </span>
              </div>

              {/* List */}
              {comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} user={user} />
              ))}

              {/* Load More instead of Pagination */}
              <CommentLoadMore
                onLoadMore={handleLoadMore}
                isLoading={status === "loading"}
                hasMore={page < totalPages}
              />
            </div>
          </main>
        </section>
      </div>
    </div>
  );
}
