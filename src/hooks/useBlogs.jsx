import useAuthFetch from './useAuthFetch';
import { useState, useEffect } from 'react';

export default function useBlogs(query = '') {
  const [blogs, setBlogs] = useState(null);
  const [error, setError] = useState(null);

  const { response, fetchError } = useAuthFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/blogs?${query}`,
  );

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
    } else {
      response?.json().then((json) => {
        switch (json.status) {
          case 'success': {
            setBlogs(json.data.blogs);
            setError(null);
            break;
          }
          case 'fail': {
            setBlogs(null);
            setError(json.data.message);
            break;
          }
          case 'error': {
            setBlogs(null);
            setError(json.message);
          }
        }
      });
    }
  }, [response, fetchError]);

  return { blogs, error };
}
