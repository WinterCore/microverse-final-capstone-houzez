import {
  createStore, compose, applyMiddleware, combineReducers,
} from 'redux';
import ReduxThunk from 'redux-thunk';

import userReducer, { INITIAL_STATE as USER_INITIAL_STATE } from './user/reducer';
import housesReducer, { INITIAL_STATE as HOUSES_INITIAL_STATE } from './houses/reducer';

const INITIAL_STATE = {
  user: USER_INITIAL_STATE,
  houses: HOUSES_INITIAL_STATE,
};

const myCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    user: userReducer,
    houses: housesReducer,
  }),
  INITIAL_STATE,
  myCompose(applyMiddleware(ReduxThunk)),
);

export default store;
