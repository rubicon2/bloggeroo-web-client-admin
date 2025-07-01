import { Link } from 'react-router';
import styled from 'styled-components';

const Container = styled.div`
  padding-bottom: 1rem;
`;

export default function UsersListUser({ user }) {
  return (
    <Link key={user.id} to={`/users/${user.id}`}>
      <h3>
        {user.email} - {user.name}
      </h3>
      <Container>
        <div>Banned - {'' + user.isBanned}</div>
        <div>Admin - {'' + user.isAdmin}</div>
      </Container>
    </Link>
  );
}
