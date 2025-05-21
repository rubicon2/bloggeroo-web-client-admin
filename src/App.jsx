import AppRouter from './AppRouter';
import userReducer, { initialState } from './reducers/userReducer';
import { UserStateContext, UserDispatchContext } from './contexts/UserContext';

import { useReducer } from 'react';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserStateContext value={state}>
      <UserDispatchContext value={dispatch}>
        <AppRouter />
      </UserDispatchContext>
    </UserStateContext>
  );
}

export default App;
