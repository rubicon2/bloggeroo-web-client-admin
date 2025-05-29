import useUsers from '../hooks/useUsers';
import { useState } from 'react';
import { Link } from 'react-router';

export default function UsersPage() {
  const [query, setQuery] = useState('');
  const { users, error } = useUsers(query);

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
      {error && <p>{error}</p>}
    </>
  );
}
