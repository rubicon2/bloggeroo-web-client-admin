import CommentsList from './commentsList';
import PageNav from '../pageNav';
import CommentsSearchForm from './commentsSearchForm';
import useRefresh from '../../hooks/useRefresh';
import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import { useLoaderData, useRouteError } from 'react-router';

export default function CommentsPage() {
  const { comments, atLastPage } = useLoaderData();
  const error = useRouteError();
  const refresh = useRefresh();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();

  return (
    <>
      <CommentsSearchForm />
      <h2>Comments</h2>
      <div>
        <CommentsList
          comments={comments}
          onReply={refresh}
          onDelete={refresh}
        />
        {error && <p>{error.message}</p>}
      </div>
      <PageNav
        currentPageNumber={currentPageNumber}
        onPageChange={setCurrentPageNumber}
        atLastPage={atLastPage}
      />
    </>
  );
}
