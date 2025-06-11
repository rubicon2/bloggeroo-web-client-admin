export default function objToSearchStr(obj) {
  return Object.entries(obj)
    .map((entry) => {
      const [key, value] = entry;
      return key + '=' + value;
    })
    .join('&');
}
