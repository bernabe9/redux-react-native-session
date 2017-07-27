import { USER_SESSION, USER_DATA } from './constants';
import { AsyncStorage } from 'react-native';
import {
  getSessionSuccess,
  getSessionError,
  getUserSessionSuccess,
  getUserSessionError,
  sessionCheckedSuccess,
  userCheckedSuccess,
  sessionCheckedError,
  userCheckedError
} from './actions';
import reducer from './reducer';
import immutableReducer from './immutableReducer';

let instance;

export class sessionService {
  constructor(store, options) {
    instance = this;
    sessionService.setOptions(store, options);
    return instance;
  }

  static setOptions(store, {
    redirectPath = '/login'
  } = {}) {
    instance.store = store;
    instance.redirectPath = redirectPath;
  }

  static initSessionService(store, options) {
    instance = new sessionService(store, options);
    sessionService.refreshFromLocalStorage();
  }

  static refreshFromLocalStorage() {
    return sessionService.loadSession()
    .then(() => {
      instance.store.dispatch(getSessionSuccess());
      instance.store.dispatch(sessionCheckedSuccess());
      sessionService.loadUser().then((user) => {
        instance.store.dispatch(getUserSessionSuccess(user));
        instance.store.dispatch(userCheckedSuccess(user));
      });
    })
    .catch(() => {
      instance.store.dispatch(sessionCheckedError());
      instance.store.dispatch(userCheckedError());
      instance.store.dispatch(getSessionError());
    });
  }

  static saveSession(session) {
    return new Promise((resolve) => {
      AsyncStorage.setItem(USER_SESSION, JSON.stringify(session))
      .then(() => {
        instance.store.dispatch(getSessionSuccess());
        resolve();
      });
    });
  }

  static loadSession() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(USER_SESSION)
      .then((currentSession) => {
        if (currentSession) {
          resolve(JSON.parse(currentSession));
        } else {
          reject('Session not found');
        }
      })
      .catch(err => reject(err));
    });
  }

  static deleteSession() {
    return AsyncStorage.removeItem(USER_SESSION).then(() => {
      instance.store.dispatch(getSessionError());
    });
  }

  static saveUser(user) {
    return new Promise((resolve) => {
      AsyncStorage.setItem(USER_DATA, JSON.stringify(user))
      .then(() => {
        instance.store.dispatch(getUserSessionSuccess(user));
        resolve();
      });
    });
  }

  static loadUser() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(USER_DATA)
      .then((currentUser) => {
        if (currentUser) {
          resolve(JSON.parse(currentUser));
        } else {
          reject('User not found');
        }
      })
      .catch(err => reject(err));
    });
  }

  static deleteUser() {
    return AsyncStorage.removeItem(USER_DATA).then(() => {
      instance.store.dispatch(getUserSessionError());
    });
  }
}

export const sessionReducer = reducer;
export const sessionImmutableReducer = immutableReducer;
