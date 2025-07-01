import UsersList from './usersList';
import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import PageNav from '../pageNav';
import UsersSearchForm from './usersSearchForm';
import { Cols, Sticky } from '../styles/mainPage';
import { GeneralButton } from '../styles/buttons';

import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import { Link, useLoaderData, useRouteError } from 'react-router';

export default function UsersPage() {
  const { users, atLastPage } = useLoaderData();
  const error = useRouteError();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();

  return (
    <main>
      <PageTitleBar title="Users">
        <Link to="/users/new" as={GeneralButton}>
          <GeneralButton type="button">New</GeneralButton>
        </Link>
      </PageTitleBar>
      <Container>
        <Cols>
          <div>
            <UsersList users={users} />
            {error && <p>{error.message}</p>}
            <PageNav
              currentPageNumber={currentPageNumber}
              onPageChange={setCurrentPageNumber}
              atLastPage={atLastPage}
            />
          </div>
          <div>
            <Sticky>
              <UsersSearchForm />
            </Sticky>
          </div>
        </Cols>
      </Container>
    </main>
  );
}
