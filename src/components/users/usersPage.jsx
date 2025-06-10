import PageNav from '../pageNav';
import UsersSearchForm from './usersSearchForm';
import useSearchParamsPageNumber from '../../hooks/useSearchParamsPageNumber';
import { Link, useLoaderData, useRouteError } from 'react-router';
import UsersList from './usersList';

export default function UsersPage() {
  const { users, atLastPage } = useLoaderData();
  const error = useRouteError();
  const [currentPageNumber, setCurrentPageNumber] = useSearchParamsPageNumber();

  return (
    <>
      <UsersSearchForm />
      <h2>Users</h2>
      <Link to="/users/new">
        <button type="button">New User</button>
      </Link>
      <div>
        <UsersList users={users} />
        {error && <p>{error.message}</p>}
        <PageNav
          currentPageNumber={currentPageNumber}
          onPageChange={setCurrentPageNumber}
          atLastPage={atLastPage}
        />
      </div>
    </>
  );
}
