import useAuthFetch from './useAuthFetch';
import { useState, useEffect } from 'react';

export default function useComments(query = '') {
  const [comments, setComments] = useState(null);
  const [error, setError] = useState(null);

  const { response, fetchError } = useAuthFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/comments?${query}`,
  );

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    } else {
      response?.json().then((json) => {
        switch (json.status) {
          case 'success': {
            setComments(json.data.comments);
            setError(null);
            break;
          }
          case 'fail': {
            setComments(null);
            setError(json.data.message);
            break;
          }
          case 'error': {
            setComments(null);
            setError(json.message);
            break;
          }
        }
      });
    }
  }, [response, fetchError]);

  return { comments, error };
}
