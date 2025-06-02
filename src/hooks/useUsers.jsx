import useJsend from './useJSend';

export default function useUsers(query = '') {
  const { data, error } = useJsend(
    `${import.meta.env.VITE_SERVER_URL}/admin/users?${query}`,
  );

  return { users: data?.users, error };
}
