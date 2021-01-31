import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';

import House from '../../components/House';

import axios from '../../api/index';
import * as data from '../data';

import { render } from '../utils';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_HOUSE: jest.fn(),
  FAVOURITE_HOUSE: jest.fn(),
  UNFAVOURITE_HOUSE: jest.fn(),
}));

describe('House Component', () => {
  test('Renders the house fetched from an external api successfully.', async () => {
    const house = data.house();
    axios.mockResolvedValueOnce({ data: { data: house } });
    render(<House houseId={house.id} />);

    await waitFor(() => {
      screen.getByText(house.name);
      screen.getByText(house.price_per_month.toLocaleString());
      screen.getByText(house.house_type.name);
      screen.getByText(house.description);
    });
  });

  test('Sends an api request to change the house\'s favourited state when a button is clicked', async () => {
    const house = data.house();
    axios.mockResolvedValueOnce({ data: { data: house } });
    render(<House houseId={house.id} />);

    const getButtonText = bool => (bool ? 'Remove from Favourites' : 'Add to Favourites');

    axios.mockResolvedValueOnce({ data: { message: house.favourited.toString() } });
    await waitFor(() => {
      const button = screen.getByText(getButtonText(house.favourited));
      fireEvent.click(button);
    });

    await waitFor(() => {
      screen.getByText(getButtonText(!house.favourited));
      screen.getByText(house.favourited.toString());
    });
  });
});
