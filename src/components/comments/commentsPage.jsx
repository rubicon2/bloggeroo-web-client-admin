import PageTitleBar from '../pageTitleBar';
import CommentsList from './commentsList';
import Container from '../container';
import PageNav from '../pageNav';
import CommentsSearchForm from './commentsSearchForm';
import { Cols, Sticky } from '../styles/mainPage';
import { GeneralButton } from '../styles/buttons';
import { MediaMobileOnly, MediaTabletAndLarger } from '../styles/mediaQueries';

import useRefresh from '../../hooks/useRefresh';
import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import { useLoaderData, useRouteError } from 'react-router';
import { useState } from 'react';

export default function CommentsPage() {
  const { comments, atLastPage } = useLoaderData();
  const error = useRouteError();
  const refresh = useRefresh();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <main>
      <PageTitleBar title="Comments">
        <MediaMobileOnly>
          <GeneralButton
            type="button"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            aria-label={
              isMobileSearchOpen ? 'Close search form' : 'Show search form'
            }
          >
            {isMobileSearchOpen ? 'Close' : 'Search'}
          </GeneralButton>
        </MediaMobileOnly>
      </PageTitleBar>
      <Container>
        {isMobileSearchOpen && (
          // Form seemed sluggish on Firefox but only when touch simulation was turned on?
          <MediaMobileOnly>
            <CommentsSearchForm />
          </MediaMobileOnly>
        )}
        <Cols>
          <div>
            <CommentsList
              comments={comments}
              onReply={refresh}
              onDelete={refresh}
              createParentCommentLink={(comment) =>
                `/comments?commentId=${comment.parentCommentId}`
              }
            />
            {error && <p>{error.message}</p>}
            <PageNav
              currentPageNumber={currentPageNumber}
              onPageChange={setCurrentPageNumber}
              atLastPage={atLastPage}
            />
          </div>
          <MediaTabletAndLarger>
            <Sticky>
              <CommentsSearchForm />
            </Sticky>
          </MediaTabletAndLarger>
        </Cols>
      </Container>
    </main>
  );
}
