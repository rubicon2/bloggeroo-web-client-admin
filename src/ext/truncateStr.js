function limitLines(str, maxLines) {
  return str
    .split('\n')
    .filter((_line, index) => index < maxLines)
    .join('\n');
}

function limitWords(str, maxWords) {
  return str
    .split(' ')
    .filter((_word, index) => index < maxWords)
    .join(' ');
}

function limitChars(str, maxChars) {
  return str
    .split('')
    .filter((_char, index) => index < maxChars)
    .join('');
}

export { limitLines, limitWords, limitChars };
