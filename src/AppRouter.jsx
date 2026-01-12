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
import ImagesPage from './components/images/imagesPage';
import ImagePage from './components/images/imagePage';
import NewImagePage from './components/images/newImagePage';

import blogsLoader from './loaders/blogsLoader';
import blogLoader from './loaders/blogLoader';
import commentsLoader from './loaders/commentsLoader';
import commentLoader from './loaders/commentLoader';
import usersLoader from './loaders/usersLoader';
import userLoader from './loaders/userLoader';
import imagesLoader from './loaders/imagesLoader';
import imageLoader from './loaders/imageLoader';

import { AccessContext } from './contexts/AppContexts';

import { useContext, useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

// This re-generates the browser router every time the state (i.e. access token) changes. Not great.
// But the only way I could find to get the access token into the loader was by currying the access token
// into generated loader functions. So when the access token changes, the loader functions need to be re-generated.
export default function AppRouter() {
  const accessRef = useContext(AccessContext);
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        path: '/',
        Component: Outlet,
        ErrorBoundary: ErrorPage,
        children: [
          {
            index: true,
            Component: LogInPage,
          },
          {
            path: '/',
            Component: Root,
            children: [
              {
                ErrorBoundary: ErrorPage,
                children: [
                  {
                    index: true,
                    Component: BlogsPage,
                    loader: blogsLoader(accessRef),
                  },
                  {
                    path: 'blogs',
                    Component: BlogsPage,
                    loader: blogsLoader(accessRef),
                  },
                  {
                    path: 'blogs/new',
                    Component: NewBlogPage,
                  },
                  {
                    path: 'blogs/:blogId',
                    Component: BlogPage,
                    loader: blogLoader(accessRef),
                  },
                  {
                    path: 'comments',
                    Component: CommentsPage,
                    loader: commentsLoader(accessRef),
                  },
                  {
                    path: 'comments/:commentId',
                    Component: CommentPage,
                    loader: commentLoader(accessRef),
                  },
                  {
                    path: 'users',
                    Component: UsersPage,
                    loader: usersLoader(accessRef),
                  },
                  {
                    path: 'users/new',
                    Component: NewUserPage,
                  },
                  {
                    path: 'users/:userId',
                    Component: UserPage,
                    loader: userLoader(accessRef),
                  },
                  {
                    path: 'images',
                    Component: ImagesPage,
                    loader: imagesLoader(accessRef),
                  },
                  {
                    path: 'images/new',
                    Component: NewImagePage,
                  },
                  {
                    path: 'images/:imageId',
                    Component: ImagePage,
                    loader: imageLoader(accessRef),
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  }, [accessRef]);

  return <RouterProvider router={router} />;
}
