export default function Loader() {
  return (
    <div className="flex justify-center items-center py-10" role="status" aria-live="polite">
      <div
        className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"
        aria-hidden="true"
      ></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
