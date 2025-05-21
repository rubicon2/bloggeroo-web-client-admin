import { useLoaderData, useRouteError, Link } from 'react-router';

export function userLoader(accessToken) {
  return async ({ params }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/users/${params.userId}`,
      {
        headers: {
          Authorization: accessToken ? 'Bearer ' + accessToken : '',
        },
      },
    );
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

export default function User() {
  const error = useRouteError();
  const json = useLoaderData();
  const user = json.data.user;
  return (
    <>
      {user && (
        <>
          <h2>
            {user.email} - {user.name}
          </h2>
          <div>Banned - {'' + user.isBanned}</div>
          <div>Admin - {'' + user.isAdmin}</div>
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
}
