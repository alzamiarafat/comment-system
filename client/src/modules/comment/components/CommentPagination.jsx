export default function CommentPagination({
  pages,
  currentPage,
  handlePageChange,
}) {
  return (
    <>
      <div className="flex justify-center mt-10 space-x-2 flex-wrap">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-4 py-1 rounded-md text-sm font-medium transition duration-150 ${
              p === currentPage
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </>
  );
}
