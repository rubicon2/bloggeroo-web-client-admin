import PageTitleBar from '../pageTitleBar';
import CommentsList from './commentsList';
import Container from '../container';
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
      <PageTitleBar title="Comments" />
      <Container>
        <main>
          <CommentsList
            comments={comments}
            onReply={refresh}
            onDelete={refresh}
          />
          {error && <p>{error.message}</p>}
          <PageNav
            currentPageNumber={currentPageNumber}
            onPageChange={setCurrentPageNumber}
            atLastPage={atLastPage}
          />
        </main>
        <CommentsSearchForm />
      </Container>
    </>
  );
}
