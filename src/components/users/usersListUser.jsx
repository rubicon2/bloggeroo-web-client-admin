import ListItemButtonsContainer from '../listItemButtonsContainer';
import { GeneralButton } from '../styles/buttons';
import DeleteButton from '../deleteButton';
import { Link } from 'react-router';

export default function UsersListUser({ user, onDelete }) {
  return (
    <div>
      <h3>
        {user.email} - {user.name}
      </h3>
      <div>
        <div>Banned - {'' + user.isBanned}</div>
        <div>Admin - {'' + user.isAdmin}</div>
      </div>
      <ListItemButtonsContainer>
        <Link to={`/users/${user.id}`}>
          <GeneralButton type="button">Edit</GeneralButton>
        </Link>
        <DeleteButton
          url={`${import.meta.env.VITE_SERVER_URL}/admin/users/${user.id}`}
          onDelete={onDelete}
        >
          Delete
        </DeleteButton>
      </ListItemButtonsContainer>
    </div>
  );
}
