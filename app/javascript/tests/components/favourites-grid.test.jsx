import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import FavouritesGrid from '../../components/FavouritesGrid';

import axios from '../../api/index';
import * as data from '../data';

import { render } from '../utils';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_FAVOURITES: jest.fn(),
}));

describe('FavouritesGrid Component', () => {
  test('Fetches and renders favourites from an external API', async () => {
    const favourites = [data.houseSnippet()];
    axios.mockResolvedValueOnce({ data: { data: favourites } });
    render(<FavouritesGrid />);

    await waitFor(() => {
      for (let i = 0; i < favourites.length; i += 1) {
        const favourite = favourites[i];
        screen.getByText(favourite.name);
        screen.getByText(favourite.price_per_month.price_per_month.toLocaleString());
      }
    });
  });
});
