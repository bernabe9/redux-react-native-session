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

export const getSessionSuccess = (session) => {
  return {
    session,
    type: GET_SESSION_SUCCESS
  };
};

export const getSessionError = () => {
  return { type: GET_SESSION_ERROR };
};

export const getUserSessionSuccess = (user) => {
  return {
    user,
    type: GET_USER_SESSION_SUCCESS
  };
};

export const getUserSessionError = () => {
  return { type: GET_USER_SESSION_ERROR };
};

export const sessionCheckedSuccess = () => {
  return { type: SESSION_CHECKED_SUCCESS };
};

export const userCheckedSuccess = (user) => {
  return {
    user,
    type: USER_CHECKED_SUCCESS
  };
};

export const sessionCheckedError = () => {
  return { type: SESSION_CHECKED_ERROR };
};

export const userCheckedError = () => {
  return { type: USER_CHECKED_ERROR };
};
