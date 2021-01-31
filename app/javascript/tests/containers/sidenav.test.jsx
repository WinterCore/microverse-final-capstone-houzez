import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';

import { render } from '../utils';
import Sidenav from '../../containers/Sidenav';

import { INITIAL_STATE } from '../../store/index';
import * as data from '../data';

describe('Sidenav Container', () => {
  let initialState;
  let user;

  beforeEach(() => {
    user = { ...data.user(), token: 'wot' };
    initialState = { ...INITIAL_STATE, user: { ...INITIAL_STATE.user, user } };
  });

  test('Renders the correct content', async () => {
    render(<Sidenav isOpen />, { initialState });

    await waitFor(() => {
      screen.getByText('Houses');
      screen.getByText('Favourites');
      screen.getByText(user.name);
      screen.getByText(user.email);
      screen.getByText('Logout');
    });
  });

  test('Redirects to the houses route when the user clicks on the houses link', async () => {
    render(
      <>
        <Route exact path="/sidenav" render={() => <Sidenav isOpen />} />
        <Route exact path="/" render={() => <div>HOUSES ROUTE</div>} />
      </>,
      { initialState, initialRoute: '/sidenav' },
    );

    fireEvent.click(screen.getByText('Houses'));

    await screen.findByText('HOUSES ROUTE');
  });

  test('Redirects to the favourites route when the user clicks on the favourites link', async () => {
    render(
      <>
        <Route exact path="/sidenav" render={() => <Sidenav isOpen />} />
        <Route exact path="/favourites" render={() => <div>FAVOURITES ROUTE</div>} />
      </>,
      { initialState, initialRoute: '/sidenav' },
    );

    fireEvent.click(screen.getByText('Favourites'));

    await screen.findByText('FAVOURITES ROUTE');
  });

  test('Redirects to the login page when the user clicks on the logout button', async () => {
    render(
      <>
        <Route exact path="/" render={() => <Sidenav isOpen />} />
        <Route exact path="/login" render={() => <div>LOGIN ROUTE</div>} />
      </>,
      { initialState },
    );

    fireEvent.click(screen.getByText('Logout'));

    await screen.findByText('LOGIN ROUTE');
    screen.findByText('Logged out succcessfully!'); // Logout notification
  });
});
