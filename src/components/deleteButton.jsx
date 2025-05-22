import { useNavigate } from 'react-router';
import { UserDispatchContext, UserStateContext } from '../contexts/UserContext';
import { useContext, useState } from 'react';
import authFetch from '../ext/authFetch';

export default function DeleteButton({ url, successRedirect, children }) {
  const state = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    setIsFetching(true);
    const { access } = await authFetch(url, state.accessToken, {
      method: 'delete',
    });
    if (access)
      dispatch({ type: 'refreshed_access_token', accessToken: access });
    setIsFetching(false);
    navigate(successRedirect || '/');
  }

  return (
    <button onClick={handleClick} disabled={isFetching}>
      {children}
    </button>
  );
}
