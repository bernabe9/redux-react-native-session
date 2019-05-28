# Redux React Native Session

[![NPM version](https://img.shields.io/npm/v/redux-react-native-session.svg?style=flat)](https://npmjs.org/package/redux-react-native-session)
[![Dependency Status](https://img.shields.io/david/bernabe9/redux-react-native-session.svg)](https://david-dm.org/bernabe9/redux-react-native-session)

Keep your session sync with AsyncStorage and Redux :key:

Redux React Native Session provides an simple API that allows to manage sessions through the app.

## Installation

* Install:

yarn:

`yarn add redux-react-native-session`

npm:

`npm install redux-react-native-session`

* Link:

`react-native link @react-native-community/async-storage`

## Usage

- Add the session reducer:
```javascript
import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-native-session';

const reducers = {
  // ... your other reducers here ...
  session: sessionReducer
};
const reducer = combineReducers(reducers);
```
- Initiate the session service:
```javascript
import { createStore } from 'redux';
import { sessionService } from 'redux-react-native-session';

const store = createStore(reducer)

sessionService.initSessionService(store);
```

## API

### initSessionService(store)
Initialize an instance of the session service.

### refreshFromAsyncStorage
Force to refresh the Redux store from the AsyncStorage.

Note: this function is called once the session service is initialized

### saveSession(session:object) : Promise
Saves the session object in the AsyncStorage and changes the `authenticated` flag to `true` in Redux store

### loadSession : Promise(currentSession:Object)
Returns the current session if exists

Example:
```javascript
loadSession
.then(currentSession => console.log(currentSession))
.catch(err => console.log(err))
```

### deleteSession : Promise
Deletes the current session from the AsyncStorage

### saveUser(user:object) : Promise
Saves the user object in the AsyncStorage and in the Redux store

### loadUser : Promise
Returns the current user if exists

### deleteUser : Promise
Deletes the current user from the AsyncStorage and the Redux store

## Immutable JS
Usage of `redux-react-native-session` with an immutable store is really simple.
Instead of the `sessionReducer` import the `sessionImmutableReducer`, as the following example:

- Add the session reducer:
```javascript
import { combineReducers } from 'redux';
import { sessionImmutableReducer as session } from 'redux-react-native-session';

const reducers = {
  // ... your other reducers here ...
  session
};
const reducer = combineReducers(reducers);
```
