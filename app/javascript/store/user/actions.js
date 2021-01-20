import { createAction } from '../utils';

import Api, { LOGIN as LOGIN_ENDPOINT } from '../../api/index';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATING = 'AUTHENTICATING';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';

export const login = token => async dispatch => {
  dispatch(createAction(AUTHENTICATING));

  try {
    const { data } = await Api({ ...LOGIN_ENDPOINT(), data: { token } });
    const user = { ...data.data, token: data.token };
    window.localStorage.setItem('user', JSON.stringify(user));
    Api.defaults.headers.common.Authorization = user.token;
    dispatch(createAction(LOGIN, user));
  } catch (e) {
    dispatch(createAction(AUTHENTICATION_ERROR, 'Something happened!'));
  }
};

export const logout = () => dispatch => {
  dispatch(createAction(LOGOUT));
  window.localStorage.setItem('user', JSON.stringify(null));
  Api.defaults.headers.common.Authorization = '';
};
