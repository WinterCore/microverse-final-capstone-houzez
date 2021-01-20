import Axios from 'axios';

import { API_URL } from './endpoints';

export * from './endpoints';

const user = JSON.parse(window.localStorage.getItem('user'));

const api = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
  },
});

api.defaults.headers.common.Authorization = `Bearer ${user ? user.token : ''}`;

export default api;
