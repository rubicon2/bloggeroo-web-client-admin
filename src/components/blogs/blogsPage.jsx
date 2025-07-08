import Container from '../container';
import PageNav from '../pageNav';
import BlogsSearchForm from './blogsSearchForm';
import BlogsList from './blogsList';
import PageTitleBar from '../pageTitleBar';
import { Cols, Sticky } from '../styles/mainPage';
import { GeneralButton } from '../styles/buttons';
import { MediaMobileOnly, MediaTabletAndLarger } from '../styles/mediaQueries';

import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import useRefresh from '../../hooks/useRefresh';
import { Link, useLoaderData, useRouteError } from 'react-router';
import { useState } from 'react';

export default function BlogsPage() {
  const { blogs, atLastPage } = useLoaderData();
  const error = useRouteError();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();
  const refresh = useRefresh();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  return (
    <main>
      <PageTitleBar title="Blogs">
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
        <Link to="/blogs/new">
          <GeneralButton type="button">New</GeneralButton>
        </Link>
      </PageTitleBar>
      <Container>
        {isMobileSearchOpen && (
          // Form seemed sluggish on Firefox but only when touch simulation was turned on?
          <MediaMobileOnly>
            <BlogsSearchForm />
          </MediaMobileOnly>
        )}
        <Cols>
          <div>
            <BlogsList blogs={blogs} onDelete={refresh} />
            {error && <p>{error.message}</p>}
            <PageNav
              currentPageNumber={currentPageNumber}
              onPageChange={setCurrentPageNumber}
              atLastPage={atLastPage}
            />
          </div>
          <MediaTabletAndLarger>
            <Sticky>
              <BlogsSearchForm />
            </Sticky>
          </MediaTabletAndLarger>
        </Cols>
      </Container>
    </main>
  );
}
