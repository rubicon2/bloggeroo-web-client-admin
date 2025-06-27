export default function objToSearchStr(obj) {
  return Object.entries(obj)
    .map((entry) => {
      const [key, value] = entry;
      let str = '';
      // If value is array, turn into multiple query keys and values for the same key.
      const valueArr = [value].flat();
      for (const v of valueArr) {
        str += key + '=' + v + '&';
      }
      // Remove last '&'.
      return str.slice(0, str.length - 1);
    })
    .join('&');
}
