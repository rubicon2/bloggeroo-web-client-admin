import useJsend from './useJSend';

export default function useBlogs(query = '') {
  const { data, error } = useJsend(
    `${import.meta.env.VITE_SERVER_URL}/admin/blogs?${query}`,
  );

  return { blogs: data?.blogs, error };
}
