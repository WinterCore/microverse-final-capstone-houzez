import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import { Route } from 'react-router-dom';

import { render } from '../utils';
import Login from '../../routes/Login';
import axios from '../../api/index';

import * as data from '../data';

jest.mock('react-google-login', () => ({
  __esModule: true,
  default({ onSuccess, render }) {
    const onClick = () => onSuccess({ tokenId: 'token' });
    return render({ onClick, disabled: false });
  },
}));

jest.mock('../../api/index', () => {
  const def = jest.fn();
  def.defaults = { headers: { common: {} } };
  return {
    __esModule: true,
    default: def,
    LOGIN: jest.fn(),
  };
});

describe('Login Route', () => {
  test('Logs the user in when the "Login with Google" button is clicked', async () => {
    render(
      <>
        <Route exact path="/login" component={Login} />
        <Route exact path="/">HOME ROUTE</Route>
      </>,
      { initialRoute: '/login' },
    );
    const user = data.user();
    axios.mockResolvedValueOnce({ data: { data: user, token: 'token' } });

    fireEvent.click(screen.getByText('Login with Google'));

    await waitFor(() => {
      screen.getByText('HOME ROUTE');
    });
  });

  test('Shows error notification when login fails', async () => {
    render(<Login />);
    axios.mockRejectedValueOnce(new Error());

    fireEvent.click(screen.getByText('Login with Google'));

    await waitFor(() => {
      screen.getByText('Something happened!');
    });
  });
});
