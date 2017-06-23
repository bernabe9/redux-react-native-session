# Redux React Session

[![NPM version](https://img.shields.io/npm/v/redux-react-session.svg?style=flat)](https://npmjs.org/package/redux-react-session)
[![Build status: Linux](https://img.shields.io/travis/bernabe9/redux-react-session.svg?style=flat)](https://travis-ci.org/bernabe9/redux-react-session)
[![Dependency Status](https://img.shields.io/david/bernabe9/redux-react-session.svg)](https://david-dm.org/bernabe9/redux-react-session)
[![Coverage Status](https://img.shields.io/coveralls/bernabe9/redux-react-session.svg)](https://coveralls.io/github/bernabe9/redux-react-session?branch=master)

Keep your session sync with localStorage and Redux :key:

Redux React Session provides an API that allows to manage sessions through the app, with authorization function for [react-router](https://github.com/ReactTraining/react-router) and a persisted session.

## Installation
yarn:

`yarn add redux-react-session`

npm:

`npm install redux-react-session --save`

## Usage

- Add the session reducer:
```javascript
import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

const reducers = {
  // ... your other reducers here ...
  session: sessionReducer
};
const reducer = combineReducers(reducers);
```
- Initiate the session service:
```javascript
import { createStore } from 'redux';
import { sessionService } from 'redux-react-session';

const store = createStore(reducer)

sessionService.initSessionService(store);
```
## Examples
The examples simulates a simple login/logout that sends requests to a server.

### Run the example
1. **get into the folder**:`cd examples/example`
2. **install dependencies**: `npm install`
3. **run the example**: `npm start`

### Run the example for react router v4
1. **get into the folder**:`cd examples/react-router-v4-example`
2. **install dependencies**: `npm install`
3. **run the example**: `npm start`


## API

### initSessionService(store, options)
Initialize an instance of the session service.

Options:
- refreshOnCheckAuth(**default**: false): Refresh Redux store in the `checkAuth` function
- redirectPath(**default**: `"login"`): Path used when a session is rejected or doesn't exist
- driver: Force to use a particular driver, should be: 'INDEXEDDB', 'WEBSQL', 'LOCALSTORAGE' or 'COOKIES'

Example:
```javascript
const options = { refreshOnCheckAuth: true, redirectPath: '/home', driver: 'COOKIES' };
sessionService.initSessionService(store, options);
```

### refreshFromLocalStorage
Force to refresh the Redux Store from the localStorage.

Note: this function is called once the session service is initialized

### checkAuth
Authorization function for [react-router](https://github.com/ReactTraining/react-router) to restrict routes, it checks if exist a session and redirects to the `redirectPath`

Example:
```javascript
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { sessionService } from 'redux-react-session';
import App from './components/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute onEnter={sessionService.checkAuth} component={HomePage} />
    <Route path="login" component={LoginPage} />
  </Route>
);
```

Note: If you're using react-router v4 this function it's not necessary. Check out the [react-router-v4-example](https://github.com/bernabe9/redux-react-session/tree/master/examples/react-router-v4-example)

Note: This function could be used in the client side as well as the server side.

### saveSession(session:object) : Promise
Saves the session object in the storage/cookies and changes the `authenticated` flag to `true` in Redux Store

### loadSession : Promise(currentSession:Object)
Returns the current session if exists

Example:
```javascript
loadSession
.then(currentSession => console.log(currentSession))
.catch(err => console.log(err))
```

### deleteSession : Promise
Deletes the current session from the storage/cookies

### saveUser(user:object) : Promise
Saves the user object in the storage/cookies and in the Redux Store

### loadUser : Promise
Returns the current user if exists

### deleteUser : Promise
Deletes the current user from the storage/cookies

## Server Rendering
`redux-react-session` also provides methods to keep the session with server rendering using cookies. So the session will work on the server side as well as the client side.

### initServerSession(store, req)
Initialize an instance of the server session service.

This function is used in the `server.js` to initialize a session service instance in each request.
```javascript
// server.js
import { sessionService } from 'redux-react-session';

// ...
app.use((req, res) => {
  const store = createStrore();
  sessionService.initServerSession(store, req);
  // ...
}
// ...
```

### initSessionService(store, { driver: 'COOKIES' })
Initialize an instance of the client session service, IMPORTANT to set the option 'COOKIES'(this is the way that the client send the session data to the server).

This function is used in the `client.js` of the server rendering to initialize a session service instance.
```javascript
// client.js
import { createStore } from 'redux';
import { sessionService } from 'redux-react-session';

const store = createStore(reducer)

initSessionService(store, { driver: 'COOKIES' });
```
