import UsersList from './usersList';
import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import PageNav from '../pageNav';
import UsersSearchForm from './usersSearchForm';

import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import { Link, useLoaderData, useRouteError } from 'react-router';

export default function UsersPage() {
  const { users, atLastPage } = useLoaderData();
  const error = useRouteError();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();

  return (
    <>
      <PageTitleBar title="Users">
        <Link to="/users/new">
          <button type="button">New</button>
        </Link>
      </PageTitleBar>
      <Container>
        <main>
          <UsersList users={users} />
          {error && <p>{error.message}</p>}
          <PageNav
            currentPageNumber={currentPageNumber}
            onPageChange={setCurrentPageNumber}
            atLastPage={atLastPage}
          />
        </main>
        <UsersSearchForm />
      </Container>
    </>
  );
}
