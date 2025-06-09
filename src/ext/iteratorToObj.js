export default function iteratorToObj(iterator) {
  return iterator.entries().reduce((obj, entry) => {
    const [key, value] = entry;
    return {
      ...obj,
      [key]: value,
    };
  }, {});
}
