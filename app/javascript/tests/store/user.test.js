import faker from 'faker';

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
      const token = faker.git.commitSha();
      const user = data.user();
      axios.mockResolvedValueOnce({ data: { data: user, token } });

      const expectedActions = [
        { type: actions.AUTHENTICATING },
        { type: actions.LOGIN, payload: { ...user, token } },
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
      const token = faker.git.commitSha();
      const user = data.user();
      const state = reducer(
        undefined,
        createAction(actions.LOGIN, { ...user, token }),
      );

      expect(state)
        .toEqual({ ...USER_INITIAL_STATE, user: { ...user, token } });
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
