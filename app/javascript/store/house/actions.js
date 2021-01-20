import { createAction } from '../utils';

import Api, { GET_HOUSE } from '../../api/index';

export const FETCH_HOUSE = 'FETCH_HOUSE';
export const FETCH_HOUSE_SUCCESS = 'FETCH_HOUSE_SUCCESS';
export const FETCH_HOUSE_ERROR = 'FETCH_HOUSE_ERROR';

export const fetch = id => async dispatch => {
  dispatch(createAction(FETCH_HOUSE));

  try {
    const { data: { data } } = await Api(GET_HOUSE(id));
    dispatch(createAction(FETCH_HOUSE_SUCCESS, data));
  } catch (e) {
    if (e.response.status === 404) dispatch(createAction(FETCH_HOUSE_ERROR, 'Not Found!'));
    else dispatch(createAction(FETCH_HOUSE_ERROR, 'Something happened!'));
  }
};
