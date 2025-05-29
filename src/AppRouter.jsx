import Root from './components/root';
import BlogsPage from './components/blogs/blogsPage';
import BlogPage from './components/blogs/blogPage';
import NewBlogPage from './components/blogs/newBlogPage';
import ErrorPage from './components/errorPage';
import CommentsPage from './components/comments/commentsPage';
import CommentPage from './components/comments/commentPage';
import LogInPage from './components/logInPage';
import UsersPage from './components/users/usersPage';
import UserPage from './components/users/userPage';
import NewUserPage from './components/users/newUserPage';

import blogLoader from './loaders/blogLoader';
import commentLoader from './loaders/commentLoader';
import userLoader from './loaders/userLoader';

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
        ErrorBoundary: ErrorPage,
        children: [
          {
            ErrorBoundary: ErrorPage,
            children: [
              {
                index: true,
                Component: BlogsPage,
              },
              {
                path: 'blogs',
                Component: BlogsPage,
              },
              {
                path: 'blogs/new',
                Component: NewBlogPage,
              },
              {
                path: 'blogs/:blogId',
                Component: BlogPage,
                loader: blogLoader(state.accessToken),
              },
              {
                path: 'comments',
                Component: CommentsPage,
              },
              {
                path: 'comments/:commentId',
                Component: CommentPage,
                loader: commentLoader(state.accessToken),
              },
              {
                path: 'users',
                Component: UsersPage,
              },
              {
                path: 'users/new',
                Component: NewUserPage,
              },
              {
                path: 'users/:userId',
                Component: UserPage,
                loader: userLoader(state.accessToken),
              },
              {
                path: 'log-in',
                Component: LogInPage,
              },
            ],
          },
        ],
      },
    ]);
  }, [state]);

  return <RouterProvider router={router} />;
}
