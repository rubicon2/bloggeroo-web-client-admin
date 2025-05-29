import { useNavigate } from 'react-router';
import { AccessContext } from '../contexts/AppContexts';
import { useContext, useState } from 'react';
import authFetch from '../ext/authFetch';

export default function DeleteButton({ url, successRedirect, children }) {
  const accessRef = useContext(AccessContext);
  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  async function handleClick() {
    setIsFetching(true);
    const { fetchError } = await authFetch(url, accessRef, {
      method: 'delete',
    });
    setIsFetching(false);
    if (!fetchError) {
      navigate(successRedirect || '/');
    }
  }

  return (
    <button onClick={handleClick} disabled={isFetching}>
      {children}
    </button>
  );
}
