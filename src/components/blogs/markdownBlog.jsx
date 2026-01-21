import Markdown from 'react-markdown';
import styled from 'styled-components';

const H1 = styled.h3`
  font-size: 2rem;
  margin: 1em 0;
  border-bottom: 2px solid #00000020;
`;

const H2 = styled.h4`
  font-size: 1.6rem;
  margin: 1em 0;
  border-bottom: 2px solid #00000020;
`;

const H3 = styled.h5`
  font-size: 1.4rem;
  margin: 1em 0;
`;

const H4 = styled.h6`
  font-size: 1.2rem;
  margin: 1em 0;
`;

const H5 = styled.h6`
  font-size: 1rem;
  margin: 1em 0;
`;

const H6 = styled.h6`
  font-size: 0.8rem;
  margin: 1em 0;
`;

const PreserveWhitespaceP = styled.p`
  white-space-collapse: preserve;
  max-width: 50ch;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CodePre = styled.pre`
  background-color: black;
  border-radius: 5px;
  color: white;
  overflow-x: scroll;
  padding: 1rem;
`;

const markdownComponents = {
  h1({ children, ...props }) {
    return <H1 {...props}>{children}</H1>;
  },
  h2({ children, ...props }) {
    return <H2 {...props}>{children}</H2>;
  },
  h3({ children, ...props }) {
    return <H3 {...props}>{children}</H3>;
  },
  h4({ children, ...props }) {
    return <H4 {...props}>{children}</H4>;
  },
  h5({ children, ...props }) {
    return <H5 {...props}>{children}</H5>;
  },
  h6({ children, ...props }) {
    return <H6 {...props}>{children}</H6>;
  },
  p({ children, ...props }) {
    return <PreserveWhitespaceP {...props}>{children}</PreserveWhitespaceP>;
  },
  pre({ children, ...props }) {
    return <CodePre {...props}>{children}</CodePre>;
  },
};

export default function MarkdownBlog({ children }) {
  return <Markdown components={markdownComponents}>{children}</Markdown>;
}
