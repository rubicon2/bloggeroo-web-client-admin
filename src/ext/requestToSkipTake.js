const defaults = {
  take: 5,
  page: 1,
};

export default function requestToSkipTake(request, options = {}) {
  const allOptions = {
    ...defaults,
    ...options,
  };
  const searchParams = new URL(request.url).searchParams;
  const take = parseInt(searchParams.get('take')) || allOptions.take;
  const page = parseInt(searchParams.get('page')) || allOptions.page;
  // Subtract 1 from page, so page 1 skips zero items.
  const skip = (page - 1) * take;
  return { skip, take };
}
