export default function blogLoader(accessRef) {
  // If blogLoader tries to load a non-existent blog, accessToken is always null?
  // This was because I was testing by typing garbo into the address bar for the blogId.
  // That seems to cause the entire app to re-initialise, and the reducer uses the initialValue of { accessToken: null }.
  // If I navigate to a bad link inside the app by making the Links incorrect, then it works as expected.
  return async ({ params }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${params.blogId}`,
      {
        headers: {
          Authorization: accessRef.current ? 'Bearer ' + accessRef.current : '',
        },
      },
    );
    const json = await response.json();
    switch (json.status) {
      case 'success': {
        return json;
      }
      case 'fail': {
        throw new Error(json.data.message);
      }
      case 'error': {
        throw new Error(json.message);
      }
    }
  };
}
