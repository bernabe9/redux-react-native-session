import { USER_SESSION, USER_DATA } from './constants';
import { asyncStorage } from 'react-native';
import {
  getSessionSuccess,
  getSessionError,
  getUserSessionSuccess,
  getUserSessionError
} from './actions';
import reducer from './reducer';

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
      sessionService.loadUser().then((user) => {
        instance.store.dispatch(getUserSessionSuccess(user));
      });
    })
    .catch(() => {
      instance.store.dispatch(getSessionError());
    });
  }

  static saveSession(session) {
    return new Promise((resolve) => {
      asyncStorage.setItem(USER_SESSION, JSON.stringify(session))
      .then(() => {
        instance.store.dispatch(getSessionSuccess());
        resolve();
      })
    })
  }

  static loadSession() {
    return new Promise((resolve, reject) => {
      asyncStorage.getItem(USER_SESSION)
      .then((currentSession) => {
        if (currentSession) {
          resolve(JSON.parse(currentSession));
        } else {
          reject('Session not found');
        }
      })
      .catch(err => reject(err));
    })
  }

  static deleteSession() {
    return asyncStorage.removeItem(USER_SESSION).then(() => {
      instance.store.dispatch(getSessionError());
    });
  }

  static saveUser(user) {
    return new Promise((resolve) => {
      asyncStorage.setItem(USER_DATA, JSON.stringify(user))
      .then(() => {
        instance.store.dispatch(getUserSessionSuccess(user));
        resolve();
      })
    })
  }

  static loadUser() {
    return new Promise((resolve, reject) => {
      asyncStorage.getItem(USER_DATA)
      .then((currentUser) => {
        if (currentUser) {
          resolve(JSON.stringify(currentUser));
        } else {
          reject('User not found');
        }
      })
      .catch(err => reject(err));
    })
  }

  static deleteUser() {
    return asyncStorage.removeItem(USER_DATA).then(() => {
      instance.store.dispatch(getUserSessionError());
    });
  }
}

export const sessionReducer = reducer;
