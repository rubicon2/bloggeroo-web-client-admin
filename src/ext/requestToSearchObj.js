export default function requestToSearchObj(request) {
  return Array.from(new URL(request.url).searchParams.entries()).reduce(
    (obj, param) => {
      const [key, value] = param;
      return {
        ...obj,
        [key]: value,
      };
    },
    {},
  );
}
