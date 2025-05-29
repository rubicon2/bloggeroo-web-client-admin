import authFetch from '../ext/authFetch';
import { AccessContext } from '../contexts/AppContexts';
import { useState, useEffect, useContext } from 'react';

export default function useAuthFetch(url) {
  const accessRef = useContext(AccessContext);
  const [response, setResponse] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { response, fetchError } = await authFetch(url, accessRef);
      setResponse(response);
      setFetchError(fetchError);
    }
    fetchData();
  }, [url, accessRef]);

  return { response, fetchError };
}
