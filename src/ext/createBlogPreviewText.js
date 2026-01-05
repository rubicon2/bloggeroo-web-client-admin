import * as regExp from './regExp';
import { limitLines, limitWords } from './truncateStr';

export default function createBlogPreviewText(blog) {
  const blogMarkdownNoHeadings = blog.body
    .split('\n')
    .filter((line) => !line.match(regExp.markdownHeadings))
    .join('\n')
    .split('\n\n\n')
    .join('\n\n')
    .trim();
  const lineCount = blogMarkdownNoHeadings.split('\n').length;
  const charCount = blogMarkdownNoHeadings.split('').length;
  // A single line could end up being really long and forming a paragraph, so limit by lines and then words.
  const truncatedPreview = limitWords(
    limitLines(blogMarkdownNoHeadings, 10),
    50,
  );
  const isTruncated =
    truncatedPreview.split('\n').length < lineCount ||
    truncatedPreview.split('').length < charCount;
  // Add ellipsis to indicate the preview has been truncated.
  return isTruncated ? truncatedPreview + '...\n' : truncatedPreview;
}
