import UnstyledList from '../unstyledList';
import UsersListUser from './usersListUser';

export default function UsersList({ users }) {
  return (
    <>
      {users?.length > 0 ? (
        <UnstyledList>
          {users.map((user) => (
            <li key={user.id}>
              <UsersListUser user={user} />
            </li>
          ))}
        </UnstyledList>
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
}
