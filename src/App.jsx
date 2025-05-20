import Root from './components/root';
import Blogs from './components/blogs';
import Blog, { blogLoader } from './components/blog';
import Error from './components/error';
import Comments from './components/comments';
import Comment, { commentLoader } from './components/comment';
import LogIn from './components/logIn';
import Users from './components/users';
import User, { userLoader } from './components/user';

import userReducer, { initialState } from './reducers/userReducer';
import { UserStateContext, UserDispatchContext } from './contexts/UserContext';

import { useReducer, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        Component: Root,
        ErrorBoundary: Error,
        children: [
          {
            ErrorBoundary: Error,
            children: [
              {
                index: true,
                Component: Blogs,
              },
              {
                path: 'blogs',
                Component: Blogs,
              },
              {
                path: 'blogs/:blogId',
                Component: Blog,
                loader: blogLoader(state.accessToken),
              },
              {
                path: 'comments',
                Component: Comments,
              },
              {
                path: 'comments/:commentId',
                Component: Comment,
                loader: commentLoader(state.accessToken),
              },
              {
                path: 'users',
                Component: Users,
              },
              {
                path: 'users/:userId',
                Component: User,
                loader: userLoader(state.accessToken),
              },
              {
                path: 'log-in',
                Component: LogIn,
              },
            ],
          },
        ],
      },
    ]);
  }, [state]);

  return (
    <UserStateContext value={state}>
      <UserDispatchContext value={dispatch}>
        <RouterProvider router={router} />
      </UserDispatchContext>
    </UserStateContext>
  );
}

export default App;
