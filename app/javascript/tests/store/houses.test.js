import * as actions from '../../store/houses/actions';
import reducer, { INITIAL_STATE as HOUSES_INITIAL_STATE } from '../../store/houses/reducer';

import axios from '../../api/index';
import { INITIAL_STATE } from '../../store/index';
import * as data from '../data';

import { mockStore } from '../utils';
import { createAction } from '../../store/utils';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_HOUSES: jest.fn(),
  GET_FAVOURITES: jest.fn(),
}));

describe('Houses store', () => {
  describe('Houses actions', () => {
    it(`Should create ${actions.FETCH_HOUSES} and ${actions.FETCH_HOUSES_SUCCESS} when listing houses succeeds`, async () => {
      const houseSnippets = [data.houseSnippet()];
      axios.mockResolvedValueOnce({ data: { data: houseSnippets } });

      const expectedActions = [
        { type: actions.FETCH_HOUSES },
        { type: actions.FETCH_HOUSES_SUCCESS, payload: { data: houseSnippets, page: 1 } },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetch(1, 1));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it(`Should create ${actions.FETCH_HOUSES} and ${actions.FETCH_HOUSES_ERROR} when fetching houses fails`, async () => {
      axios.mockRejectedValueOnce(new Error());

      const expectedActions = [
        { type: actions.FETCH_HOUSES },
        { type: actions.FETCH_HOUSES_ERROR, payload: 'Something happened!' },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetch(1, 1));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it(`Should create ${actions.FETCH_MORE_HOUSES} and ${actions.FETCH_MORE_HOUSES_SUCCESS} when fetching more houses succeeds`, async () => {
      const houseSnippets = [data.houseSnippet()];
      axios.mockResolvedValueOnce({ data: { data: houseSnippets } });

      const expectedActions = [
        { type: actions.FETCH_MORE_HOUSES },
        {
          type: actions.FETCH_MORE_HOUSES_SUCCESS,
          payload: { data: houseSnippets, page: 2 },
        },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetch(1, 2));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it(`Should create ${actions.FETCH_HOUSES} and ${actions.FETCH_HOUSES_ERROR} when fetching more houses fails`, async () => {
      axios.mockRejectedValueOnce(new Error());

      const expectedActions = [
        { type: actions.FETCH_MORE_HOUSES },
        { type: actions.FETCH_MORE_HOUSES_ERROR, payload: 'Something happened!' },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetch(1, 2));

      expect(store.getActions()).toEqual(expectedActions);
    });

    it(`Should create ${actions.FETCH_HOUSES} and ${actions.FETCH_HOUSES_ERROR} when fetching favourites fails`, async () => {
      axios.mockRejectedValueOnce(new Error());

      const expectedActions = [
        { type: actions.FETCH_HOUSES },
        { type: actions.FETCH_HOUSES_ERROR, payload: 'Something happened!' },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetchFavourites());

      expect(store.getActions()).toEqual(expectedActions);
    });

    it(`Should create ${actions.FETCH_MORE_HOUSES} and ${actions.FETCH_MORE_HOUSES_SUCCESS} when fetching favourites succeeds`, async () => {
      const houseSnippets = [data.houseSnippet()];
      axios.mockResolvedValueOnce({ data: { data: houseSnippets } });

      const expectedActions = [
        { type: actions.FETCH_HOUSES },
        { type: actions.FETCH_HOUSES_SUCCESS, payload: { data: houseSnippets } },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.fetchFavourites());

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('House reducer', () => {
    it('Should return the initial state when provided with undefined', () => {
      expect(reducer(undefined, {})).toEqual(HOUSES_INITIAL_STATE);
    });

    it(`Should handle ${actions.FETCH_HOUSES}`, () => {
      const state = reducer(undefined, createAction(actions.FETCH_HOUSES));
      expect(state).toEqual({ ...HOUSES_INITIAL_STATE, isLoading: true });
    });

    it(`Should handle ${actions.FETCH_HOUSES_SUCCESS}`, () => {
      const houseSnippets = [data.houseSnippet()];
      const state = reducer(
        undefined,
        createAction(actions.FETCH_HOUSES_SUCCESS, { data: houseSnippets, page: 1 }),
      );
      expect(state).toEqual({ ...HOUSES_INITIAL_STATE, data: houseSnippets });
    });

    it(`Should handle ${actions.FETCH_HOUSES_ERROR}`, () => {
      const state = reducer(undefined, createAction(actions.FETCH_HOUSES_ERROR, 'error'));
      expect(state).toEqual({ ...HOUSES_INITIAL_STATE, error: 'error' });
    });

    it(`Should handle ${actions.FETCH_MORE_HOUSES}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.FETCH_MORE_HOUSES),
      );
      expect(state).toEqual({ ...HOUSES_INITIAL_STATE, isLoadingMore: true });
    });

    it(`Should handle ${actions.FETCH_MORE_HOUSES_SUCCESS}`, () => {
      const houseSnippets = [data.houseSnippet()];
      const moreHouseSnippets = [data.houseSnippet()];
      const state = reducer(
        { ...HOUSES_INITIAL_STATE, data: houseSnippets },
        createAction(actions.FETCH_MORE_HOUSES_SUCCESS, { data: moreHouseSnippets, page: 2 }),
      );
      expect(state)
        .toEqual({
          ...HOUSES_INITIAL_STATE, page: 2, data: [...houseSnippets, ...moreHouseSnippets],
        });
    });

    it(`Should handle ${actions.FETCH_MORE_HOUSES_ERROR}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.FETCH_MORE_HOUSES_ERROR, 'Something happened!'),
      );
      expect(state).toEqual({ ...HOUSES_INITIAL_STATE });
    });
  });
});
