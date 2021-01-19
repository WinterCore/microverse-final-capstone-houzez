import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';

import userReducer, { INITIAL_STATE as USER_INITIAL_STATE } from './user/reducer';

const INITIAL_STATE = {
    user: USER_INITIAL_STATE,
};

const store = createStore(
    combineReducers({
        user: userReducer,
    }),
    INITIAL_STATE,
    compose(applyMiddleware(ReduxThunk)),
);

export default store;
