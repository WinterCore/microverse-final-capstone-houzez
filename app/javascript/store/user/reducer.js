import { LOGIN, LOGOUT, AUTHENTICATING, AUTHENTICATION_ERROR } from './actions';

export const INITIAL_STATE = {
    user: null,
    authenticating: false,
    error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case LOGIN:
        return { user: action.payload, authenticating: false, error: null };
    case LOGOUT:
        return { user: null, authenticating: false, error: null };
    case AUTHENTICATING:
        return { ...state, authenticating: true, error: null };
    case AUTHENTICATION_ERROR:
        return { error: action.payload, authenticating: false, user: null };
    default:
        return state;
    }
};

export default userReducer;
