import UnstyledList from '../unstyledList';
import BlogsListBlog from './blogsListBlog';
import LineSeparatedListItem from '../lineSeparatedListItem';

export default function BlogsPageList({ blogs, onDelete }) {
  return (
    <>
      {blogs?.length > 0 ? (
        <UnstyledList>
          {blogs.map((blog) => (
            <LineSeparatedListItem key={blog.id}>
              <BlogsListBlog blog={blog} onDelete={onDelete} />
            </LineSeparatedListItem>
          ))}
        </UnstyledList>
      ) : (
        <p>No blogs found.</p>
      )}
    </>
  );
}
