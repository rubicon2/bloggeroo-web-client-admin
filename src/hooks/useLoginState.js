import { useEffect, useState } from 'react';

export default function useLoginState() {
  // Get initial login state from cookie upon app load.
  const [login, setLogin] = useState(
    document.cookie
      .split('; ')
      .find((c) => c.startsWith('login='))
      ?.split('=')[1],
  );

  // Not sure useEffect is necessary, but since setting/clearing a cookie is a side effect, using it.
  useEffect(() => {
    if (!login) {
      // Clear the cookies if user has just logged out.
      document.cookie = '';
    }
  }, [login]);

  return [login, setLogin];
}
