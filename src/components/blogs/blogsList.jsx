import BlogsListBlog from './blogsListBlog';

export default function BlogsPageList({ blogs }) {
  return (
    <>
      {blogs?.length > 0 ? (
        <ul>
          {blogs.map((blog) => (
            <li key={blog.id}>
              <BlogsListBlog blog={blog} />
            </li>
          ))}
        </ul>
      ) : (
        <p>No blogs found.</p>
      )}
    </>
  );
}
