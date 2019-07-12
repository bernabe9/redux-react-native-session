import Immutable from 'immutable';
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

export const initialState = Immutable.fromJS({
  authenticated: false,
  sessionChecked: false,
  session: {},
  userChecked: false,
  user: {}
});

const immutableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSION_SUCCESS: {
      return state.merge({
        authenticated: true,
        session: Immutable.fromJS(action.session)
      });
    }
    case GET_SESSION_ERROR: {
      return state.merge({
        authenticated: false,
        session: Immutable.Map()
      });
    }
    case GET_USER_SESSION_SUCCESS: {
      return state.set('user', Immutable.fromJS(action.user));
    }
    case GET_USER_SESSION_ERROR: {
      return state.set('user', Immutable.Map());
    }
    case SESSION_CHECKED_SUCCESS:
    case SESSION_CHECKED_ERROR: {
      return state.set('sessionChecked', true);
    }
    case USER_CHECKED_SUCCESS:
    case USER_CHECKED_ERROR: {
      return state.set('userChecked', true);
    }
    default: {
      return state;
    }
  }
};

export default immutableReducer;
