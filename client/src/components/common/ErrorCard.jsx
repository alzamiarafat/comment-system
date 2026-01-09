export default function ErrorCard({ error }) {
  return (
    <>
      <div className="flex items-center justify-between bg-red-100 p-2 rounded">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <div className="text-sm font-light text-red-500">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
