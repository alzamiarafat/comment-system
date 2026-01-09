import { useSelector } from "react-redux";
import { LuSend } from "react-icons/lu";

export default function CommentPost({ handleComment, replyTo, setReplyTo }) {
  const { status } = useSelector((state) => state.comments);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
        <form onSubmit={handleComment} className="space-y-3">
          {/* Reply Info */}
          {replyTo && (
            <div className="flex items-center justify-between text-xs px-3 py-2 rounded-md bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400">
              <span>Replying to comment #{replyTo}</span>
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="hover:underline text-red-500"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Textarea */}
          <textarea
            name="content"
            rows="3"
            placeholder={replyTo ? "Write a reply…" : "Write a comment…"}
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Actions */}
          <div className="flex items-center justify-between">
            {/* Left icons (future use) */}
            <div className="flex gap-1 text-gray-400">
              <button
                type="button"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                😊
              </button>
              <button
                type="button"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                📎
              </button>
              <button
                type="button"
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                🖼️
              </button>
            </div>

            {/* Submit Button */}
            {status === "loading" ? (
              <button
                disabled
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-blue-400 px-4 py-2 text-sm font-medium text-white"
              >
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Posting…
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-full bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white transition"
              >
                {replyTo ? "Reply" : "Comment"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
