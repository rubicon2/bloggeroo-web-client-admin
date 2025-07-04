import UsersList from './usersList';
import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import PageNav from '../pageNav';
import UsersSearchForm from './usersSearchForm';
import { Cols, Sticky } from '../styles/mainPage';
import { GeneralButton } from '../styles/buttons';
import { MediaMobileOnly, MediaTabletAndLarger } from '../styles/mediaQueries';

import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import useRefresh from '../../hooks/useRefresh';
import { Link, useLoaderData, useRouteError } from 'react-router';
import { useState } from 'react';

export default function UsersPage() {
  const { users, atLastPage } = useLoaderData();
  const error = useRouteError();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const refresh = useRefresh();

  return (
    <main>
      <PageTitleBar title="Users">
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
        <Link to="/users/new" as={GeneralButton}>
          <GeneralButton type="button">New</GeneralButton>
        </Link>
      </PageTitleBar>
      <Container>
        {isMobileSearchOpen && (
          // Form seemed sluggish on Firefox but only when touch simulation was turned on?
          <MediaMobileOnly>
            <UsersSearchForm />
          </MediaMobileOnly>
        )}
        <Cols>
          <div>
            <UsersList users={users} onDelete={refresh} />
            {error && <p>{error.message}</p>}
            <PageNav
              currentPageNumber={currentPageNumber}
              onPageChange={setCurrentPageNumber}
              atLastPage={atLastPage}
            />
          </div>
          <MediaTabletAndLarger>
            <Sticky>
              <UsersSearchForm />
            </Sticky>
          </MediaTabletAndLarger>
        </Cols>
      </Container>
    </main>
  );
}
