import { useRouteError } from 'react-router';

export default function Error() {
  const error = useRouteError();
  return (
    <>
      <h2>An error has occurred</h2>
      <h3>{error.message}</h3>
      <p>{error.stack}</p>
    </>
  );
}
