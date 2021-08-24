import {
  USER_LOGIN,
  AUTH_FAILURE,
  USER_LOGOUT,
  UPDATE_USER,
  IS_AUTHENTICATING,
  setUserToken,
  removeUserToken
} from "../api/auth"

export const defaultUserState = () => ({
  token: null,
  groups: [],
  authLevel: -1,
  authed: false,
  attempts: 0,
  meta: [],
  id: null,
  isAuthenticating: false,
  email: null
});

export default (state = defaultUserState(), action) => {
  switch (action.type) {
    case IS_AUTHENTICATING: {
      return { ...state, isAuthenticating: true };
    }
    case UPDATE_USER: {
      return { ...state, ...action.update };
    }
    case USER_LOGIN: {
      setUserToken(action.user);
      const newState = { ...state, ...action.user, authed: true, isAuthenticating: false };
      ++newState.attempts;
      return newState;
    }
    case AUTH_FAILURE: {
      removeUserToken();
      const newState = defaultUserState();
      ++newState.attempts;
      return newState;
    }
    case USER_LOGOUT: {
      removeUserToken();
      return defaultUserState();
    }
    default:
      return state;
  }
};
