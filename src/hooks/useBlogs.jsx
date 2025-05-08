import { useState, useEffect } from 'react';

export default function useBlogs(query = '') {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/blogs?${query}`,
        );
        const json = await response.json();
        switch (json.status) {
          case 'success': {
            setBlogs(json.data.blogs);
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

  return blogs;
}
