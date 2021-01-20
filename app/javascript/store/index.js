import {
  createStore, compose, applyMiddleware, combineReducers,
} from 'redux';
import ReduxThunk from 'redux-thunk';

import userReducer, { INITIAL_STATE as USER_INITIAL_STATE } from './user/reducer';
import housesReducer, { INITIAL_STATE as HOUSES_INITIAL_STATE } from './houses/reducer';
import houseTypesReducer, { INITIAL_STATE as HOUSE_TYPES_INITIAL_STATE } from './house-types/reducer';
import houseReducer, { INITIAL_STATE as HOUSE_INITIAL_STATE } from './house/reducer';

const INITIAL_STATE = {
  user: USER_INITIAL_STATE,
  houses: HOUSES_INITIAL_STATE,
  houseTypes: HOUSE_TYPES_INITIAL_STATE,
  house: HOUSE_INITIAL_STATE,
};

const myCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    user: userReducer,
    houses: housesReducer,
    houseTypes: houseTypesReducer,
    house: houseReducer,
  }),
  INITIAL_STATE,
  myCompose(applyMiddleware(ReduxThunk)),
);

export default store;
