import { useSearchParams } from 'react-router';

export default function PageNav({ atLastPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageNumber = parseInt(searchParams.get('page')) || 1;
  return (
    <div>
      {currentPageNumber > 1 && (
        <button
          type="button"
          onClick={() => setSearchParams({ page: currentPageNumber - 1 })}
        >
          Previous
        </button>
      )}
      {!atLastPage && (
        <button
          type="button"
          onClick={() => setSearchParams({ page: currentPageNumber + 1 })}
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
