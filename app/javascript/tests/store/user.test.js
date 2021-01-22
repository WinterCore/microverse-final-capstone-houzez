import * as actions from '../../store/user/actions';
import reducer, { INITIAL_STATE as USER_INITIAL_STATE } from '../../store/user/reducer';

import axios from '../../api/index';
import { INITIAL_STATE } from '../../store/index';
import * as data from '../data';

import { mockStore } from '../utils';
import { createAction } from '../../store/utils';

jest.mock('../../api/index', () => {
  const def = jest.fn();
  def.defaults = { headers: { common: {} } };
  return {
    __esModule: true,
    default: def,
    LOGIN: jest.fn(),
  };
});

describe('User store', () => {
  describe('User actions', () => {
    it(`Should create ${actions.AUTHENTICATING} and ${actions.LOGIN} upon a successful login`, async () => {
      axios.mockResolvedValueOnce({ data: { data: data.user, token: 'token' } });

      const expectedActions = [
        { type: actions.AUTHENTICATING },
        { type: actions.LOGIN, payload: { ...data.user, token: 'token' } },
      ];

      const store = mockStore(INITIAL_STATE);

      await store.dispatch(actions.login('logintoken'));

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('House reducer', () => {
    it('Should return the initial state when provided with undefined', () => {
      expect(reducer(undefined, {})).toEqual(USER_INITIAL_STATE);
    });

    it(`Should handle ${actions.AUTHENTICATING}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.AUTHENTICATING),
      );

      expect(state).toEqual({ ...USER_INITIAL_STATE, authenticating: true });
    });

    it(`Should handle ${actions.AUTHENTICATION_ERROR}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.AUTHENTICATION_ERROR, 'Something happened!'),
      );

      expect(state).toEqual({ ...USER_INITIAL_STATE, error: 'Something happened!' });
    });

    it(`Should handle ${actions.LOGIN}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.LOGIN, { ...data.user, token: 'token' }),
      );

      expect(state)
        .toEqual({ ...USER_INITIAL_STATE, user: { ...data.user, token: 'token' } });
    });

    it(`Should handle ${actions.LOGOUT}`, () => {
      const state = reducer(
        undefined,
        createAction(actions.LOGOUT),
      );

      expect(state).toEqual({ ...USER_INITIAL_STATE });
    });
  });
});
