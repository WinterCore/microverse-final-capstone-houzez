import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';

import { render } from '../utils';
import Header from '../../containers/Header';

import { INITIAL_STATE } from '../../store/index';
import * as data from '../data';

describe('Header Container', () => {
  let initialState;
  let handleSidenavToggle;
  let user;

  beforeEach(() => {
    user = { ...data.user(), token: 'wot' };
    initialState = { ...INITIAL_STATE, user: { ...INITIAL_STATE.user, user } };
    handleSidenavToggle = jest.fn();
  });
  test('Renders the correct content', async () => {
    render(<Header handleSidenavToggle={handleSidenavToggle} />, { initialState });

    await waitFor(() => {
      screen.getByText('Houses');
      screen.getByText('Favourites');
      screen.getByText(user.name);
    });
  });

  test('Calls handleSidenavToggle when the hamburger icon is clicked', () => {
    render(<Header handleSidenavToggle={handleSidenavToggle} />, { initialState });

    fireEvent.click(screen.getByText('menu'));

    expect(handleSidenavToggle).toHaveBeenCalled();
  });

  test('Redirects to the houses route when the user clicks on the houses link', async () => {
    render(
      <>
        <Route exact path="/header" render={() => <Header handleSidenavToggle={handleSidenavToggle} />} />
        <Route exact path="/" render={() => <div>HOUSES ROUTE</div>} />
      </>,
      { initialState, initialRoute: '/header' },
    );

    fireEvent.click(screen.getByText('Houses'));

    await screen.findByText('HOUSES ROUTE');
  });

  test('Redirects to the favourites route when the user clicks on the favourites link', async () => {
    render(
      <>
        <Route exact path="/header" render={() => <Header handleSidenavToggle={handleSidenavToggle} />} />
        <Route exact path="/favourites" render={() => <div>FAVOURITES ROUTE</div>} />
      </>,
      { initialState, initialRoute: '/header' },
    );

    fireEvent.click(screen.getByText('Favourites'));

    await screen.findByText('FAVOURITES ROUTE');
  });

  test('Redirects to the login page when the user clicks on the logout button', async () => {
    render(
      <>
        <Route exact path="/" render={() => <Header handleSidenavToggle={handleSidenavToggle} />} />
        <Route exact path="/login" render={() => <div>LOGIN ROUTE</div>} />
      </>,
      { initialState },
    );

    fireEvent.click(screen.getByText('Logout'));

    await screen.findByText('LOGIN ROUTE');
    screen.findByText('Logged out succcessfully!'); // Logout notification
  });
});
