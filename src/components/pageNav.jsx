import { useSearchParams } from 'react-router';

export default function PageNav() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageNumber = parseInt(searchParams.get('page')) || 1;
  return (
    <div>
      Page: {currentPageNumber}
      {currentPageNumber > 1 && (
        <button
          type="button"
          onClick={() => setSearchParams({ page: currentPageNumber - 1 })}
        >
          Previous
        </button>
      )}
      {/* How to stop showing this button once we have reached the end? */}
      <button
        type="button"
        onClick={() => setSearchParams({ page: currentPageNumber + 1 })}
      >
        Next
      </button>
    </div>
  );
}
