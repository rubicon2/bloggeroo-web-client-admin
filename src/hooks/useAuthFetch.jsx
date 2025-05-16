import useSessionStorage from './useSessionStorage';
import { useState, useEffect } from 'react';

export default function useAuthFetch(url) {
  const [access, setAccess] = useSessionStorage('access', null);
  const [response, setResponse] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function authFetch() {
      try {
        // Do the fetch.
        // Doesn't fail even if access has expired? But it must do... but the accessResponse code doesn't get triggered.
        const fetchResponse = await fetch(url, {
          headers: {
            Authorization: access ? 'Bearer ' + access : '',
          },
        });

        // If it fails with a 401, use the refresh token to get a new access token.
        if (fetchResponse.status === 401) {
          const accessResponse = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/auth/access`,
            {
              method: 'post',
              // This will include cookies, but only if compliant with CORS.
              credentials: 'include',
            },
          );

          if (accessResponse.ok) {
            const json = await accessResponse.json();
            // Setting new access code will re-run this useEffect callback,
            // so the original fetch will run again with the new access token.
            setAccess(json.data.access);
          }
        }

        // Whatever the case, return the original fetch response.
        // Response body can only be consumed once by the calling component.
        // Therefore, the body should be consumed in a useEffect callback, that re-runs when the response changes.
        setResponse(fetchResponse);
      } catch (error) {
        setFetchError(error.message);
      }
    }

    authFetch();
  }, [url, access, setAccess]);

  return { response, fetchError };
}
