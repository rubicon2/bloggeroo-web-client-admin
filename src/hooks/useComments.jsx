import useJsend from './useJSend';

export default function useComments(query = '') {
  const { data, error } = useJsend(
    `${import.meta.env.VITE_SERVER_URL}/admin/comments?${query}`,
  );

  return { comments: data?.comments, error };
}
