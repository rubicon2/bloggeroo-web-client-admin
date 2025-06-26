import UnstyledList from '../unstyledList';
import BlogsListBlog from './blogsListBlog';

export default function BlogsPageList({ blogs }) {
  return (
    <>
      {blogs?.length > 0 ? (
        <UnstyledList>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <BlogsListBlog blog={blog} />
            </li>
          ))}
        </UnstyledList>
      ) : (
        <p>No blogs found.</p>
      )}
    </>
  );
}
