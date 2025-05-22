// This can be used in event handlers, or in a component with the useAuthFetch hook wrapped around it.
export default async function authFetch(url, access, options = {}) {
  try {
    const { headers, ...otherOptions } = options;
    // Try fetch with provided access code.
    let dataResponse = await fetch(url, {
      headers: {
        ...headers,
        Authorization: access ? 'Bearer ' + access : '',
      },
      // E.g. method: 'post'! Body!
      ...otherOptions,
    });

    // If response is 401, try to get a new access code.
    let newAccess = null;
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
        newAccess = json.data.access;
        dataResponse = await fetch(url, {
          headers: {
            Authorization: newAccess ? 'Bearer ' + newAccess : '',
          },
          ...options,
        });
      }
    }
    // Return result, and new access code if there is one, so the state can be updated.
    return { response: dataResponse, access: newAccess };
  } catch (error) {
    return { fetchError: error };
  }
}
