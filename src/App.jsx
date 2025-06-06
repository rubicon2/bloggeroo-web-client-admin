import AppRouter from './AppRouter';
import { AccessContext, UserContext } from './contexts/AppContexts';
import useLoginState from './hooks/useLoginState';
import { useRef } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLoginState();
  const accessRef = useRef(null);
  return (
    <AccessContext value={accessRef}>
      <UserContext value={{ isLoggedIn, setIsLoggedIn }}>
        <AppRouter />
      </UserContext>
    </AccessContext>
  );
}

export default App;
