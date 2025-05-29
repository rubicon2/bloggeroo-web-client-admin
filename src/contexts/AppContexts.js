import { createContext } from 'react';

// Stores access token in a ref, used for fetch requests.
export const AccessContext = createContext(null);
// Stores the user's login status in state, so display can change when user goes from logged out to logged in, etc.
export const UserContext = createContext(null);
