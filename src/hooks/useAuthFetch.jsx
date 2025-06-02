import authFetch from '../ext/authFetch';
import { AccessContext, UserContext } from '../contexts/AppContexts';
import { useState, useEffect, useContext } from 'react';

export default function useAuthFetch(url) {
  const accessRef = useContext(AccessContext);
  const { isLoggedIn } = useContext(UserContext);
  const [response, setResponse] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  // If a user logs out, the state changes and triggers a re-render, but the useEffect
  // callback doesn't run again because the url and accessRef haven't changed - so just
  // grab isLoggedIn from UserContext and plop it in that dependency array.

  // However, this still only runs when url changes - if user adds a new comment to a blog,
  // nothing is fetched automatically in response. This is a bit of a problem.

  // Has to be inside a useEffect callback, otherwise when state is set, this hook will
  // re-run and the fetchData function will be called repeatedly in an infinite loop. Bad bads.
  // Not bother with useAuthFetch? Instead useEffect on component? Then can control when it re-runs
  // on a per-component basis.
  useEffect(() => {
    async function fetchData() {
      const { response, fetchError } = await authFetch(url, accessRef);
      setResponse(response);
      setFetchError(fetchError);
    }
    fetchData();
  }, [url, accessRef, isLoggedIn]);

  return { response, fetchError };
}
