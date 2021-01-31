import React from 'react';
import { screen } from '@testing-library/react';
import { Route } from 'react-router-dom';

import { render } from '../utils';

import Sidenav from '../../containers/Sidenav';
import Header from '../../containers/Header';

import Index from '../../routes/Index';
import House from '../../routes/House';
import Favourites from '../../routes/Favourites';
import { INITIAL_STATE } from '../../store/index';

import AuthenticatedRouter from '../../routes/AuthenticatedRouter';

import * as data from '../data';

jest.mock('../../routes/Index', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('../../routes/House', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('../../routes/Favourites', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('../../containers/Header', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('../../containers/Sidenav', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('AuthenticatedRouter', () => {
  let initialState;
  let user;

  beforeEach(() => {
    user = { ...data.user(), token: 'wot' };
    initialState = { ...INITIAL_STATE, user: { ...INITIAL_STATE.user, user } };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Redirects to the login page when the user is not logged in', () => {
    render(
      <>
        <Route to="/" component={AuthenticatedRouter} />
        <Route to="/login">LOGIN ROUTE</Route>
      </>,
    );

    screen.getByText('LOGIN ROUTE');
  });

  it('Renders the correct children when the user is logged in', () => {
    render(<AuthenticatedRouter />, { initialState, initialRoute: '/' });

    expect(Header).toHaveBeenCalled();
    expect(Sidenav).toHaveBeenCalled();
    expect(Index).toHaveBeenCalled();
  });

  it('Renders the Houses route when /houses is visited', () => {
    render(<AuthenticatedRouter />, { initialState, initialRoute: '/houses/2' });
    expect(House).toHaveBeenCalled();
  });

  it('Renders the Favourites route when /favourites is visited', () => {
    render(<AuthenticatedRouter />, { initialState, initialRoute: '/favourites' });
    expect(Favourites).toHaveBeenCalled();
  });
});
