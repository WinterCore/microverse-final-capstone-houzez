import Axios from 'axios';

export * from './endpoints';

const user = JSON.parse(window.localStorage.getItem('user'));

const api = Axios.create({
  baseURL: window.API_URL,
  headers: {
    Accept: 'application/json',
  },
});

api.defaults.headers.common.Authorization = `Bearer ${user ? user.token : ''}`;

export default api;
