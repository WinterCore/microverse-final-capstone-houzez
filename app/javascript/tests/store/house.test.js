import * as actions from '../../store/house/actions';
import reducer, { INITIAL_STATE as HOUSE_INITIAL_STATE } from '../../store/house/reducer';

import axios from '../../api/index';
import { INITIAL_STATE } from '../../store/index';
import * as data from '../data';

import { mockStore } from '../utils';
import { createAction } from '../../store/utils';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_HOUSE: jest.fn(),
  FAVOURITE_HOUSE: jest.fn(),
  UNFAVOURITE_HOUSE: jest.fn(),
}));

describe('House store', () => {
  describe('House actions', () => {
    it(`Should create ${actions.FETCH_HOUSE_TYPES} and ${actions.FETCH_HOUSE_TYPES_SUCCESS} when fetching house types succeeds`, async () => {
      axios.mockResolvedValueOnce({ data: { data: data.house } });

      const expectedActions = [
        { type: actions.FETCH_HOUSE },
        { type: actions.FETCH_HOUSE_SUCCESS, payload: data.house },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetch(1));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it(`Should create ${actions.FETCH_HOUSE} and ${actions.FETCH_HOUSE_ERROR} when fetching a house fails`, async () => {
      axios.mockRejectedValueOnce(new Error());

      const expectedActions = [
        { type: actions.FETCH_HOUSE },
        { type: actions.FETCH_HOUSE_ERROR, payload: 'Something happened!' },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetch(1));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it(`Should create ${actions.CHANGE_HOUSE_FAVOURITE_STATE} when changing favourited state`, async () => {
      axios.mockResolvedValueOnce({ message: 'Success' });

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.changeFavourite(1, false));

      expect(store.getActions())
        .toEqual([{ type: actions.CHANGE_HOUSE_FAVOURITE_STATE, payload: false }]);
    });
  });

  describe('House reducer', () => {
    it('Should return the initial state when provided with undefined', () => {
      expect(reducer(undefined, {})).toEqual(HOUSE_INITIAL_STATE);
    });

    it(`Should handle ${actions.FETCH_HOUSE}`, () => {
      const state = reducer(undefined, createAction(actions.FETCH_HOUSE));
      expect(state).toEqual({ ...HOUSE_INITIAL_STATE, isLoading: true });
    });

    it(`Should handle ${actions.FETCH_HOUSE_SUCCESS}`, () => {
      const state = reducer(undefined, createAction(actions.FETCH_HOUSE_SUCCESS, data.house));
      expect(state).toEqual({ ...HOUSE_INITIAL_STATE, data: data.house });
    });

    it(`Should handle ${actions.FETCH_HOUSE_ERROR}`, () => {
      const state = reducer(undefined, createAction(actions.FETCH_HOUSE_ERROR, 'error'));
      expect(state).toEqual({ ...HOUSE_INITIAL_STATE, error: 'error' });
    });

    it(`Should handle ${actions.CHANGE_HOUSE_FAVOURITE_STATE}`, () => {
      const state = reducer(
        { data: { ...data.house, favourited: true }, isLoading: false, error: null },
        createAction(actions.CHANGE_HOUSE_FAVOURITE_STATE, false),
      );
      expect(state)
        .toEqual({ data: { ...data.house, favourited: false }, isLoading: false, error: null });
    });
  });
});
