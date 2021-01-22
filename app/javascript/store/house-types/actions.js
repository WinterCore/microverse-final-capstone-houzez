import { createAction } from '../utils';

import Api, { GET_HOUSE_TYPES } from '../../api/index';

export const FETCH_HOUSE_TYPES = 'FETCH_HOUSE_TYPES';
export const FETCH_HOUSE_TYPES_SUCCESS = 'FETCH_HOUSE_TYPES_SUCCESS';
export const FETCH_HOUSE_TYPES_ERROR = 'FETCH_HOUSE_TYPES_ERROR';

export const fetch = () => async dispatch => {
  dispatch(createAction(FETCH_HOUSE_TYPES));

  try {
    const { data: { data } } = await Api(GET_HOUSE_TYPES());
    dispatch(createAction(FETCH_HOUSE_TYPES_SUCCESS, data));
  } catch (e) {
    dispatch(createAction(FETCH_HOUSE_TYPES_ERROR, 'Something happened!'));
  }
};
