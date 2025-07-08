import PageTitleBar from './pageTitleBar';
import Container from './container';
import { useRouteError } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <main>
      <PageTitleBar title="An error has occurred" />
      <Container>
        <h3>{error.message}</h3>
        <p>{error.stack}</p>
      </Container>
    </main>
  );
}
