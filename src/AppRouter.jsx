import Root from './components/root';
import Blogs from './components/blogs';
import Blog, { blogLoader } from './components/blog';
import NewBlog from './components/newBlog';
import Error from './components/error';
import Comments from './components/comments';
import Comment, { commentLoader } from './components/comment';
import LogIn from './components/logIn';
import Users from './components/users';
import User, { userLoader } from './components/user';
import NewUser from './components/newUser';

import { UserStateContext } from './contexts/UserContext';
import { useContext, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

export default function AppRouter() {
  const state = useContext(UserStateContext);

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
                path: 'blogs/new',
                Component: NewBlog,
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
                path: 'users/new',
                Component: NewUser,
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

  return <RouterProvider router={router} />;
}
