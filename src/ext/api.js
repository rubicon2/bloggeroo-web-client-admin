import authFetch from './authFetch';

async function getBlogs(accessRef, urlParamsStr) {
  const { response, fetchError } = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/blogs?${urlParamsStr}`,
    accessRef,
  );
  return { response, fetchError };
}

async function getBlog(accessRef, blogId) {
  const { response, fetchError } = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/blogs/${blogId}`,
    accessRef,
  );
  return { response, fetchError };
}

async function getComments(accessRef, urlParamsStr) {
  const { response, fetchError } = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/comments?${urlParamsStr}`,
    accessRef,
  );
  return { response, fetchError };
}

async function getComment(accessRef, commentId) {
  const { response, fetchError } = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/comments/${commentId}`,
    accessRef,
  );
  return { response, fetchError };
}

async function getImages(accessRef, urlParamsStr) {
  const { response, fetchError } = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/images?${urlParamsStr}`,
    accessRef,
  );
  return { response, fetchError };
}

async function getImage(accessRef, imageId) {
  const { response, fetchError } = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/images/${imageId}`,
    accessRef,
  );
  return { response, fetchError };
}

async function getUsers(accessRef, urlParamsStr) {
  const { response, fetchError } = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/users?${urlParamsStr}`,
    accessRef,
  );
  return { response, fetchError };
}

async function getUser(accessRef, userId) {
  const { response, fetchError } = await authFetch(
    `${import.meta.env.VITE_SERVER_URL}/admin/users/${userId}`,
    accessRef,
  );
  return { response, fetchError };
}

export {
  getBlogs,
  getBlog,
  getComments,
  getComment,
  getImages,
  getImage,
  getUsers,
  getUser,
};
