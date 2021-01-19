import Axios from 'axios';

import {API_URL} from './endpoints';
import {INITIAL_STATE} from '../store/user/reducer';

export * from './endpoints';

const api = Axios.create({
    baseURL: API_URL,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${INITIAL_STATE.user ? INITIAL_STATE.user.token : ''}`
    },
});

export default api;
