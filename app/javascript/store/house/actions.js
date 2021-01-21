import { createAction } from '../utils';

import Api, { GET_HOUSE, FAVOURITE_HOUSE, UNFAVOURITE_HOUSE } from '../../api/index';

export const FETCH_HOUSE = 'FETCH_HOUSE';
export const FETCH_HOUSE_SUCCESS = 'FETCH_HOUSE_SUCCESS';
export const FETCH_HOUSE_ERROR = 'FETCH_HOUSE_ERROR';
export const CHANGE_HOUSE_FAVOURITE_STATE = 'CHANGE_HOUSE_FAVOURITE_STATE';

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

export const changeFavourite = (houseId, newState) => async dispatch => {
  let data = await Api(newState ? FAVOURITE_HOUSE(houseId) : UNFAVOURITE_HOUSE(houseId));
  dispatch(createAction(CHANGE_HOUSE_FAVOURITE_STATE, newState));
  return data.data;
};
