import UnstyledList from '../unstyledList';
import LineSeparatedListItem from '../lineSeparatedListItem';
import UsersListUser from './usersListUser';

export default function UsersList({ users }) {
  return (
    <>
      {users?.length > 0 ? (
        <UnstyledList>
          {users.map((user) => (
            <LineSeparatedListItem key={user.id}>
              <UsersListUser user={user} />
            </LineSeparatedListItem>
          ))}
        </UnstyledList>
      ) : (
        <p>No users found.</p>
      )}
    </>
  );
}
