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
      <UsersSearchForm />
      <h2>Users</h2>
      <Link to="/users/new">
        <button type="button">New User</button>
      </Link>
      <div>
        {users &&
          users.map((user) => {
            return (
              <Link key={user.id} to={`/users/${user.id}`}>
                <h3>
                  {user.email} - {user.name}
                </h3>
                <div>Banned - {'' + user.isBanned}</div>
                <div>Admin - {'' + user.isAdmin}</div>
              </Link>
            );
          })}
      </div>
      {error && <p>{error.message}</p>}
      <PageNav
        currentPageNumber={currentPageNumber}
        onPageChange={setCurrentPageNumber}
        atLastPage={atLastPage}
      />
    </>
  );
}
