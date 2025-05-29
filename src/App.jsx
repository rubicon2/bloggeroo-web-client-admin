import AppRouter from './AppRouter';
import { AccessContext, UserContext } from './contexts/AppContexts';
import { useRef, useState } from 'react';
import './App.css';

function App() {
  const accessRef = useRef(null);
  // Passing the function down in the context and calling does not trigger re-render.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Re-render occurs when user logs out, but current page still shown - does not update to reflect logged out state.
  return (
    <AccessContext value={accessRef}>
      <UserContext value={{ isLoggedIn, setIsLoggedIn }}>
        <AppRouter />
      </UserContext>
    </AccessContext>
  );
}

export default App;
