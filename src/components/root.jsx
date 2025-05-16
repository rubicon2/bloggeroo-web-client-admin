import NavBar from './navBar';
import { Outlet } from 'react-router';

export default function Root() {
  return (
    <>
      <h1>Bloggeroo Admin</h1>
      <NavBar />
      <Outlet />
    </>
  );
}
