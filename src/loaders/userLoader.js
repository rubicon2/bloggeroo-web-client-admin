import authFetch from '../ext/authFetch';

export default function userLoader(accessRef) {
  return async ({ params }) => {
    const { response, fetchError } = await authFetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/users/${params.userId}`,
      accessRef,
    );
    if (fetchError) throw fetchError;
    const json = await response.json();
    switch (json.status) {
      case 'success': {
        return json;
      }
      case 'fail': {
        throw new Error(json.data.message);
      }
      case 'error': {
        throw new Error(json.message);
      }
    }
  };
}
