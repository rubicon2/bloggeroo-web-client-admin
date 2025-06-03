export default async function responseToJsend(response) {
  try {
    if (response) {
      const json = await response.json();
      switch (json.status) {
        case 'success': {
          return { data: json.data, error: null };
        }
        case 'fail': {
          return {
            data: null,
            error: new Error(json.data.message),
          };
        }
        case 'error': {
          return { data: null, error: new Error(json.message) };
        }
      }
    } else {
      // If response is null.
      return { data: null, error: null };
    }
  } catch (error) {
    return { data: null, error };
  }
}
