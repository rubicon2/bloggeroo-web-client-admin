import { useState, useEffect } from 'react';

export default function useComments(query = '') {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/comments?${query}`,
        );
        const json = await response.json();
        switch (json.status) {
          case 'success': {
            setComments(json.data.comments);
            break;
          }
          case 'error': {
            throw new Error(json.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [query]);

  return comments;
}
