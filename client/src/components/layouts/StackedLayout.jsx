import Navbar from "../Navbar";

export default function StackedLayout(props) {
  return (
    <>
      <div class="min-h-full">
        <Navbar />
        <main>
          <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* <!-- Your content --> */}
            {props.children}
          </div>
        </main>
      </div>
    </>
  );
}
