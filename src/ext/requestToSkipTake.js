export default function requestToSkipTake(
  request,
  defaults = { take: 5, page: 1 },
) {
  const searchParams = new URL(request.url).searchParams;
  const take = parseInt(searchParams.get('take')) || defaults.take;
  const page = parseInt(searchParams.get('page')) || defaults.page;
  // Subtract 1 from page, so page 1 skips zero items.
  const skip = (page - 1) * take;
  return { skip, take };
}
