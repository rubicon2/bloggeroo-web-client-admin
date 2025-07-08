import PageNav from '../pageNav';
import { Link } from 'react-router';
import { useState } from 'react';

export default function UserPageBlogs({
  blogs,
  blogsPerPage = 5,
  defaultPage = 1,
}) {
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const firstIndex = (currentPage - 1) * blogsPerPage;
  const lastIndex = firstIndex + blogsPerPage - 1;
  const atLastPage = lastIndex >= blogs.length - 1;

  return (
    <section>
      <h3>Blogs</h3>
      {blogs?.length > 0 ? (
        <div>
          <ul>
            {blogs
              .filter(
                (blog, index) => index >= firstIndex && index <= lastIndex,
              )
              .map((blog) => (
                <li key={blog.id}>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              ))}
          </ul>
          <PageNav
            currentPageNumber={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            atLastPage={atLastPage}
          />
        </div>
      ) : (
        <p>This user has not made any blogs.</p>
      )}
    </section>
  );
}
