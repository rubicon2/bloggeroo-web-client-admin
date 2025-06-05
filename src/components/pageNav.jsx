export default function PageNav({
  currentPageNumber,
  onPageChange,
  atLastPage,
}) {
  return (
    <div>
      {currentPageNumber > 1 && (
        <button
          type="button"
          onClick={() => onPageChange(currentPageNumber - 1)}
        >
          Previous
        </button>
      )}
      {!atLastPage && (
        <button
          type="button"
          onClick={() => onPageChange(currentPageNumber + 1)}
        >
          Next
        </button>
      )}
      {!(currentPageNumber === 1 && atLastPage) && (
        <div>Page: {currentPageNumber}</div>
      )}
    </div>
  );
}
