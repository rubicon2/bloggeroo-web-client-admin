import PageNav from '../pageNav';
import { useState } from 'react';
import { Link, useLoaderData, useRouteError } from 'react-router';

export default function UsersPage() {
  const { users, atLastPage } = useLoaderData();
  const error = useRouteError();
  const [query, setQuery] = useState('');

  const filteredUsers = users.filter((user) => {
    const queryStr = query.toLowerCase();
    const { name, email } = user;
    return (
      name.toLowerCase().includes(queryStr) ||
      email.toLowerCase().includes(queryStr)
    );
  });

  return (
    <>
      <input
        type="text"
        name="query"
        id="query"
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <h2>Users</h2>
      <Link to="/users/new">
        <button type="button">New User</button>
      </Link>
      <div>
        {filteredUsers &&
          filteredUsers.map((user) => {
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
      <PageNav atLastPage={atLastPage} />
    </>
  );
}
