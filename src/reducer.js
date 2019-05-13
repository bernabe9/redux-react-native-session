import {
  GET_SESSION_SUCCESS,
  GET_SESSION_ERROR,
  GET_USER_SESSION_SUCCESS,
  GET_USER_SESSION_ERROR,
  SESSION_CHECKED_SUCCESS,
  USER_CHECKED_SUCCESS,
  SESSION_CHECKED_ERROR,
  USER_CHECKED_ERROR
} from './actionTypes';

export const initialState = {
  authenticated: false,
  sessionChecked: false,
  userChecked: false,
  user: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSION_SUCCESS: {
      return {
        ...state,
        authenticated: true
      };
    }
    case GET_SESSION_ERROR: {
      return {
        ...state,
        authenticated: false,
        sessionChecked: false
      };
    }
    case GET_USER_SESSION_SUCCESS: {
      return { ...state, user: action.user };
    }
    case GET_USER_SESSION_ERROR: {
      return {
        ...state,
        user: {},
        userChecked: false
      };
    }
    case SESSION_CHECKED_SUCCESS:
    case SESSION_CHECKED_ERROR: {
      return { ...state, sessionChecked: true };
    }
    case USER_CHECKED_SUCCESS:
    case USER_CHECKED_ERROR: {
      return { ...state, userChecked: true };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
