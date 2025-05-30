// This can be used in event handlers, or in a component with the useAuthFetch hook wrapped around it.
export default async function authFetch(url, accessRef, options = {}) {
  try {
    const { headers, ...otherOptions } = options;
    // Try fetch with provided access code.
    let dataResponse = await fetch(url, {
      headers: {
        ...headers,
        Authorization: accessRef.current ? 'Bearer ' + accessRef.current : '',
      },
      // E.g. method: 'post'! Body!
      ...otherOptions,
    });

    // If response is 401, try to get a new access code.
    if (dataResponse.status === 401) {
      const accessResponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/admin/auth/access`,
        {
          method: 'post',
          credentials: 'include',
        },
      );

      if (accessResponse.ok) {
        const json = await accessResponse.json();
        accessRef.current = json.data.access;
        dataResponse = await fetch(url, {
          headers: {
            Authorization: accessRef.current
              ? 'Bearer ' + accessRef.current
              : '',
          },
          ...options,
        });
      }
    }
    return { response: dataResponse };
  } catch (error) {
    return { fetchError: error };
  }
}
