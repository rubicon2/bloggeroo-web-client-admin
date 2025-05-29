export default function commentLoader(accessRef) {
  return async ({ params }) => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/admin/comments/${params.commentId}`,
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
