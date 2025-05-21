import { UserDispatchContext, UserStateContext } from '../contexts/UserContext';
import { useState, useEffect, useContext } from 'react';
import authFetch from '../ext/authFetch';

export default function useAuthFetch(url) {
  const { accessToken } = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);
  const [response, setResponse] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { response, access, fetchError } = await authFetch(
        url,
        accessToken,
      );
      setResponse(response);
      setFetchError(fetchError);
      if (access)
        dispatch({ type: 'refreshed_access_token', accessToken: access });
    }
    fetchData();
  }, [url, accessToken, dispatch]);

  return { response, fetchError };
}
