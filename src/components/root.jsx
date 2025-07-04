import Header from './header';
import NavBar from './navBar';
import Footer from './footer';
import { Outlet } from 'react-router';

export default function Root() {
  return (
    <>
      <Header />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}
