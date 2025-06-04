import { useLocation, useNavigate } from 'react-router';

export default function useRefresh() {
  const navigate = useNavigate();
  const location = useLocation();
  return () => {
    // Replace the current entry in the history stack.
    navigate(location.pathname + location.search, { replace: true });
  };
}
