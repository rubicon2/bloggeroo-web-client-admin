import dateTimeFormatter from '../../ext/dateTimeFormatter';
import styled from 'styled-components';

const BlogTitle = styled.h2`
  font-size: 2.2rem;
  line-height: 1;
  margin: 0;
`;

export default function BlogHeader({ blog }) {
  return (
    <header>
      <BlogTitle>{blog.title}</BlogTitle>
      <small>
        By {blog.owner.name} at{' '}
        {blog.publishedAt
          ? dateTimeFormatter.format(new Date(blog.publishedAt))
          : 'never'}
      </small>
    </header>
  );
}
