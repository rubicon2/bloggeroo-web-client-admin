import UsersListUser from './usersListUser';

export default function UsersList({ users }) {
  return (
    <>
      {users?.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <UsersListUser user={user} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
}
