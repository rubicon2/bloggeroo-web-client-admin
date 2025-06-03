import { AccessContext } from '../contexts/AppContexts';
import authFetch from '../ext/authFetch';
import { useContext, useState } from 'react';

export default function DeleteButton({ url, onDelete, children }) {
  const accessRef = useContext(AccessContext);
  const [isFetching, setIsFetching] = useState(false);

  async function handleClick() {
    setIsFetching(true);
    const { fetchError } = await authFetch(url, accessRef, {
      method: 'delete',
    });
    setIsFetching(false);
    if (!fetchError) {
      onDelete();
    }
  }

  return (
    <button onClick={handleClick} disabled={isFetching}>
      {children}
    </button>
  );
}
