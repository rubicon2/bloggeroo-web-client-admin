import ListItemButtonsContainer from '../listItemButtonsContainer';
import { GeneralButton } from '../styles/buttons';
import { FormRow } from '../styles/searchForm';
import DeleteButton from '../deleteButton';
import { Link } from 'react-router';
import styled from 'styled-components';

const UserDetailsContainer = styled.div`
  margin-bottom: 1rem;
`;

export default function UsersListUser({ user, onDelete }) {
  return (
    <div>
      <h3>
        {user.email} - {user.name}
      </h3>
      <UserDetailsContainer>
        <FormRow>
          Banned?
          <input type="checkbox" checked={user.isBanned} readOnly />
        </FormRow>
        <FormRow>
          Admin?
          <input type="checkbox" checked={user.isAdmin} readOnly />
        </FormRow>
      </UserDetailsContainer>
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
