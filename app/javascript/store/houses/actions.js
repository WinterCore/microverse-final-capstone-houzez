import { createAction } from '../utils';

import Api, { GET_HOUSES } from '../../api/index';

export const FETCH_HOUSES = 'FETCH_HOUSES';
export const FETCH_HOUSES_SUCCESS = 'FETCH_HOUSES_SUCCESS';
export const FETCH_HOUSES_ERROR = 'FETCH_HOUSES_ERROR';
export const FETCH_MORE_HOUSES = 'FETCH_MORE_HOUSES';
export const FETCH_MORE_HOUSES_SUCCESS = 'FETCH_MORE_HOUSES_SUCCESS';
export const FETCH_MORE_HOUSES_ERROR = 'FETCH_MORE_HOUSES_ERROR';

const defaultActions = [FETCH_HOUSES, FETCH_HOUSES_SUCCESS, FETCH_HOUSES_ERROR];
const moreActions = [FETCH_MORE_HOUSES, FETCH_MORE_HOUSES_SUCCESS, FETCH_MORE_HOUSES_ERROR];

export const fetch = (type, page = 1) => async dispatch => {
  const actions = page > 1 ? moreActions : defaultActions;
  dispatch(createAction(actions[0]));

  try {
    const { data: { data } } = await Api({ ...GET_HOUSES(), params: { type, page } });
    dispatch(createAction(actions[1], { data, page }));
  } catch (e) {
    dispatch(createAction(actions[2], 'Something happened'));
  }
};
