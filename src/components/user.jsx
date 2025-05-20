import { useLoaderData, Link } from 'react-router';

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
    return json;
  };
}

export default function User() {
  const json = useLoaderData();
  const user = json.data.user;
  return (
    <>
      <h2>
        {user.email} - {user.name}
      </h2>
      <div>Banned - {'' + user.isBanned}</div>
      <div>Admin - {'' + user.isAdmin}</div>
    </>
  );
}
