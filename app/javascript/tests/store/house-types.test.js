import * as actions from '../../store/house-types/actions';
import reducer, { INITIAL_STATE as HOUSE_TYPES_INITIAL_STATE } from '../../store/house-types/reducer';

import axios from '../../api/index';
import { INITIAL_STATE } from '../../store/index';
import * as data from '../data';

import { mockStore } from '../utils';
import { createAction } from '../../store/utils';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_HOUSE_TYPES: jest.fn(),
}));

describe('House types store', () => {
  describe('House types actions', () => {
    it(`Should create ${actions.FETCH_HOUSE_TYPES} and ${actions.FETCH_HOUSE_TYPES_SUCCESS} when fetching a house succeeds`, async () => {
      axios.mockResolvedValueOnce({ data: { data: [data.houseType] } });

      const expectedActions = [
        { type: actions.FETCH_HOUSE_TYPES },
        { type: actions.FETCH_HOUSE_TYPES_SUCCESS, payload: [data.houseType] },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetch(1));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it(`Should create ${actions.FETCH_HOUSE_TYPES} and ${actions.FETCH_HOUSE_TYPES_ERROR} when fetching house types fails`, async () => {
      axios.mockRejectedValueOnce(new Error());

      const expectedActions = [
        { type: actions.FETCH_HOUSE_TYPES },
        { type: actions.FETCH_HOUSE_TYPES_ERROR, payload: 'Something happened!' },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetch());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('House types reducer', () => {
    it('Should return the initial state when provided with undefined', () => {
      expect(reducer(undefined, {})).toEqual(HOUSE_TYPES_INITIAL_STATE);
    });

    it(`Should handle ${actions.FETCH_HOUSE_TYPES}`, () => {
      const state = reducer(undefined, createAction(actions.FETCH_HOUSE_TYPES));
      expect(state).toEqual({ ...HOUSE_TYPES_INITIAL_STATE, isLoading: true });
    });

    it(`Should handle ${actions.FETCH_HOUSE_TYPES_SUCCESS}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.FETCH_HOUSE_TYPES_SUCCESS, [data.houseType]),
      );
      expect(state).toEqual({ ...HOUSE_TYPES_INITIAL_STATE, data: [data.houseType] });
    });

    it(`Should handle ${actions.FETCH_HOUSE_TYPES_ERROR}`, () => {
      const state = reducer(undefined, createAction(actions.FETCH_HOUSE_TYPES_ERROR, 'error'));
      expect(state).toEqual({ ...HOUSE_TYPES_INITIAL_STATE, error: 'error' });
    });
  });
});
