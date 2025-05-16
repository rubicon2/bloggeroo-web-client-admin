import Root from './components/root';
import Blogs from './components/blogs';
import Blog from './components/blog';
import Error from './components/error';
import Comments from './components/comments';
import Comment from './components/comment';
import LogIn from './components/logIn';
import Users from './components/users';
import User from './components/user';

const routes = [
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
            loader: async ({ params }) => {
              const access = JSON.parse(sessionStorage.getItem('access'));
              const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${params.blogId}`,
                {
                  headers: {
                    Authorization: access ? 'Bearer ' + access : '',
                  },
                },
              );
              const json = await response.json();
              return json;
            },
          },
          {
            path: 'comments',
            Component: Comments,
          },
          {
            path: 'comments/:commentId',
            Component: Comment,
            loader: async ({ params }) => {
              const access = JSON.parse(sessionStorage.getItem('access'));
              const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/admin/comments/${params.commentId}`,
                {
                  headers: {
                    Authorization: access ? 'Bearer ' + access : '',
                  },
                },
              );
              const json = await response.json();
              return json;
            },
          },
          {
            path: 'users',
            Component: Users,
          },
          {
            path: 'users/:userId',
            Component: User,
            loader: async ({ params }) => {
              const access = JSON.parse(sessionStorage.getItem('access', null));
              const response = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/admin/users/${params.userId}`,
                {
                  headers: {
                    Authorization: access ? 'Bearer ' + access : '',
                  },
                },
              );
              const json = await response.json();
              return json;
            },
          },
          {
            path: 'log-in',
            Component: LogIn,
          },
        ],
      },
    ],
  },
];

export default routes;
