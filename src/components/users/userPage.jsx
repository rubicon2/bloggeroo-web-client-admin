import PageTitleBar from '../pageTitleBar';
import Container from '../container';
import DeleteButton from '../deleteButton';
import UserPageBlogs from './userPageBlogs';
import UserPageComments from './userPageComments';
import { Form, FormRow } from '../styles/searchForm';
import { GeneralButton } from '../styles/buttons';
import { MobileMarginContainer } from '../styles/mainPage';

import { AccessContext } from '../../contexts/AppContexts';
import authFetch from '../../ext/authFetch';
import responseToJsend from '../../ext/responseToJsend';

import { useContext, useState } from 'react';
import { useLoaderData, useNavigate, useRouteError } from 'react-router';

export default function UserPage() {
  const user = useLoaderData();
  const navigate = useNavigate();

  const accessRef = useContext(AccessContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isBanned, setIsBanned] = useState(user.isBanned);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);

  // routeError, fetchError, validationErrors? 3 types of errors? This sucks.
  // Could initialise error to useRouteError result? Then at least only 2 types.
  const [error, setError] = useState(useRouteError());
  const [validationErrors, setValidationErrors] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const haveFieldsChanged =
    user.email !== email ||
    user.name !== name ||
    user.isBanned !== isBanned ||
    user.isAdmin !== isAdmin;

  async function saveChanges(event) {
    event.preventDefault();
    setIsFetching(true);
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/users/${user.id}`,
      accessRef,
      {
        method: 'put',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(new FormData(event.target)),
      },
    );

    if (fetchError) setError(fetchError);
    else {
      const { status, data, error } = await responseToJsend(response);
      setError(error);
      setValidationErrors(data.validationErrors);
      switch (status) {
        case 'success': {
          navigate('/users');
          break;
        }
      }
    }
    setIsFetching(false);
  }

  return (
    <main>
      {user && (
        <>
          <MobileMarginContainer>
            <PageTitleBar title={user.email}>
              <DeleteButton
                url={`${import.meta.env.VITE_SERVER_URL}/admin/users/${user.id}`}
                onDelete={() => navigate('/users')}
              >
                Delete
              </DeleteButton>
            </PageTitleBar>
          </MobileMarginContainer>
          <Container>
            <Form onSubmit={saveChanges}>
              <FormRow>
                Email:
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <small>{validationErrors?.email}</small>
              </FormRow>
              <FormRow>
                Name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <small>{validationErrors?.name}</small>
              </FormRow>
              <FormRow>
                Banned
                <input
                  type="checkbox"
                  name="isBanned"
                  checked={isBanned}
                  onChange={(e) => setIsBanned(e.target.checked)}
                />
              </FormRow>
              <FormRow>
                Admin
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              </FormRow>
              <GeneralButton
                type="submit"
                disabled={isFetching || !haveFieldsChanged}
              >
                Save Changes
              </GeneralButton>
            </Form>
            {error && <p>{error.message}</p>}
            <UserPageBlogs blogs={user.blogs} />
            <UserPageComments comments={user.comments} />
          </Container>
        </>
      )}
    </main>
  );
}
