export default async function responseToJsend(response) {
  try {
    if (response) {
      const json = await response.json();
      switch (json.status) {
        case 'success': {
          return { status: 'success', data: json.data, error: null };
        }
        case 'fail': {
          return {
            status: 'fail',
            data: json.data,
            error: new Error(json.data.message),
          };
        }
        case 'error': {
          return {
            status: 'error',
            data: json.data,
            error: new Error(json.message),
          };
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
