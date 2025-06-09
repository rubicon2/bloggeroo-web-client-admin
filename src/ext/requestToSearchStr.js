export default function requestToSearchStr(request, ignoreParams = []) {
  const searchParams = Array.from(new URL(request.url).searchParams.entries());
  return searchParams
    .map((searchParam) => {
      const [key, value] = searchParam;
      if (ignoreParams.includes(key) || value.length === 0) return '';
      return `${key}=${value}`;
    })
    .join('&');
}
