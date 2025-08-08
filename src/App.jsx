import AppRouter from './AppRouter';
import { AccessContext, UserContext } from './contexts/AppContexts';
import useLoginState from './hooks/useLoginState';
import { useEffect, useRef } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useLoginState();
  const accessRef = useRef(null);

  // For debugging those cookies which seem to get set, but do not appear on devtools.
  const intervalRef = useRef(null);
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log('cookie:', document.cookie);
    }, 5000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <AccessContext value={accessRef}>
      <UserContext value={{ isLoggedIn, setIsLoggedIn }}>
        <AppRouter />
      </UserContext>
    </AccessContext>
  );
}

export default App;
