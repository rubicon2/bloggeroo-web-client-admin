import useAuthFetch from './useAuthFetch';
import responseToJsend from '../ext/responseToJsend';
import { useEffect, useState } from 'react';

export default function useJsend(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const { response, fetchError } = useAuthFetch(url);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    } else {
      responseToJsend(response).then(({ data, error }) => {
        setData(data);
        setError(error);
      });
    }
  }, [response, fetchError]);

  return { data, error };
}
