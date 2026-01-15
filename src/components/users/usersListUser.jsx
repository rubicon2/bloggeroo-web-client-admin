import ListItemButtonsContainer from '../listItemButtonsContainer';
import { GeneralButton, DeleteButton } from '../styles/buttons';
import { FormRow } from '../styles/searchForm';

import * as api from '../../ext/api';
import responseToJsend from '../../ext/responseToJsend';

import { AccessContext } from '../../contexts/AppContexts';
import useRefresh from '../../hooks/useRefresh';

import { useContext, useState } from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const UserDetailsContainer = styled.div`
  margin-bottom: 1rem;
`;

export default function UsersListUser({ user }) {
  const accessRef = useContext(AccessContext);
  const refresh = useRefresh();

  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  async function deleteUser(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await api.deleteUser(accessRef, user.id);
    if (fetchError) setError(fetchError);
    else {
      const { status, error } = await responseToJsend(response);
      setError(error);
      switch (status) {
        case 'success': {
          refresh();
          break;
        }
      }
    }
    setIsFetching(false);
  }

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
        <DeleteButton onClick={deleteUser} disabled={isFetching}>
          Delete
        </DeleteButton>
      </ListItemButtonsContainer>
      {error && <p>{error.message}</p>}
    </div>
  );
}
