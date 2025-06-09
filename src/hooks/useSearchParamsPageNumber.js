import iteratorToObj from '../ext/iteratorToObj';
import { useSearchParams } from 'react-router';

export default function useSearchParamsPageNumber() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPageNumber = parseInt(searchParams.get('page')) || 1;

  function setCurrentPageNumber(page) {
    setSearchParams({ ...iteratorToObj(searchParams), page });
  }

  return [currentPageNumber, setCurrentPageNumber];
}
