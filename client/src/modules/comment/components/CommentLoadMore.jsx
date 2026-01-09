// src/components/atoms/LoadMoreButton.jsx
import React from "react";

export default function LoadMoreButton({
  onLoadMore,
  isLoading = false,
  hasMore = true,
}) {
  // If no more comments are available, hide the button or show a message
  if (!hasMore) {
    return (
      <p className="text-center text-sm text-gray-500 mt-8 py-4 border-t border-gray-100 dark:border-gray-800">
        No more comments to show.
      </p>
    );
  }

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className={`
          flex items-center justify-center px-8 py-2.5 
          text-sm font-semibold rounded-xl transition-all
          ${
            isLoading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95"
          }
          dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700
        `}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          "Load More"
        )}
      </button>
    </div>
  );
}
