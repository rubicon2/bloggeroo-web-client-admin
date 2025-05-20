import routes from './routes';
import userReducer, { initialState } from './reducers/userReducer';
import { UserStateContext, UserDispatchContext } from './contexts/UserContext';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';
import { useReducer } from 'react';

const router = createBrowserRouter(routes);

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserStateContext value={state}>
      <UserDispatchContext value={dispatch}>
        <RouterProvider router={router} />
      </UserDispatchContext>
    </UserStateContext>
  );
}

export default App;
