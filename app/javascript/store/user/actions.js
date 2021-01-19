import { createAction } from '../utils';

import Api, { LOGIN as LOGIN_ENDPOINT } from '../../api/index';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATING = 'AUTHENTICATING';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const login = (token) => async (dispatch) => {
    dispatch(createAction(AUTHENTICATING));

    try {
        const { data } = await Api({ ...LOGIN_ENDPOINT(), data: { token } });
        dispatch(createAction(LOGIN, data.data));
    } catch (e) {
        dispatch(createAction(AUTHENTICATION_ERROR, 'Something happened!'));
    }
};
