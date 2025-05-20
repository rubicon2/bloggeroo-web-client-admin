export const initialState = {
  accessToken: null,
};

export default function userReducer(state, action) {
  switch (action.type) {
    case 'logged_in': {
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }

    case 'logged_out': {
      return {
        ...state,
        accessToken: null,
      };
    }

    case 'refreshed_access_token': {
      return {
        ...state,
        accessToken: action.accessToken,
      };
    }

    default: {
      throw new Error('Unknown userReducer action: ' + action.type);
    }
  }
}
