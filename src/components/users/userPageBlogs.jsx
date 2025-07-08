import UserPageListLink from './userPageListLink';
import PageNav from '../pageNav';
import MarginUnstyledList from '../marginUnstyledList';
import dateTimeFormatter from '../../ext/dateTimeFormatter';
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
          <MarginUnstyledList>
            {blogs
              .filter(
                (blog, index) => index >= firstIndex && index <= lastIndex,
              )
              .map((blog) => (
                <li key={blog.id}>
                  <UserPageListLink to={`/blogs/${blog.id}`}>
                    <div>{blog.title}</div>
                    <div>
                      {dateTimeFormatter.format(new Date(blog.createdAt))}
                    </div>
                  </UserPageListLink>
                </li>
              ))}
          </MarginUnstyledList>
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
