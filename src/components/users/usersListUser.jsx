import { Link } from 'react-router';

export default function UsersListUser({ user }) {
  return (
    <Link key={user.id} to={`/users/${user.id}`}>
      <h3>
        {user.email} - {user.name}
      </h3>
      <div>Banned - {'' + user.isBanned}</div>
      <div>Admin - {'' + user.isAdmin}</div>
    </Link>
  );
}
