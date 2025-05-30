import useAuthFetch from './useAuthFetch';
import { useState, useEffect } from 'react';

export default function useUsers(query = '') {
  // Start as null instead of empty array, so components can show loading if users is null.
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  // This will automatically try and re-authenticate if the access token has expired.
  const { response, fetchError } = useAuthFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/users?${query}`,
  );

  useEffect(() => {
    if (fetchError) {
      // Network errors, etc.
      setError(fetchError);
    } else {
      response?.json().then((json) => {
        switch (json.status) {
          case 'success': {
            setUsers(json.data.users);
            setError(null);
            break;
          }
          case 'fail': {
            // Errors expected by server.
            setUsers(null);
            setError(new Error(json.data.message));
            break;
          }
          case 'error': {
            // Errors not expected by server.
            setUsers(null);
            setError(new Error(json.message));
          }
        }
      });
    }
  }, [response, fetchError]);

  return { users, error };
}
