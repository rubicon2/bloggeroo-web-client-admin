import useAuthFetch from './useAuthFetch';
import { useEffect, useState } from 'react';

export default function useJsend(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { response, fetchError } = useAuthFetch(url);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    } else {
      response?.json().then((json) => {
        switch (json.status) {
          case 'success': {
            setData(json.data);
            setError(null);
            break;
          }
          case 'fail': {
            setData(null);
            setError(new Error(json.data.message));
            break;
          }
          case 'error': {
            setData(null);
            setError(new Error(json.message));
          }
        }
      });
    }
  }, [response, fetchError]);

  return { data, error };
}
