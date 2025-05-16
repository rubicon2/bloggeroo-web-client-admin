import { useLoaderData, Link } from 'react-router';

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
