import React from 'react';
import { screen } from '@testing-library/react';

import FavouritesGrid from '../../components/FavouritesGrid';

import { render } from '../utils';
import Favourites from '../../routes/Favourites';

jest.mock('../../components/FavouritesGrid', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('Favourites route', () => {
  it('Renders the correct content', () => {
    render(<Favourites />);

    screen.getByText('Your Favourites');
    expect(FavouritesGrid).toHaveBeenCalled();
  });
});
