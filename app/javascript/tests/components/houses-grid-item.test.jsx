import React from 'react';
import { screen } from '@testing-library/react';

import { render } from '../utils';
import HousesGridItem from '../../components/HousesGridItem';

import * as data from '../data';

describe('HousesGridItem Component', () => {
  test('Renders the correct children', () => {
    const house = data.houseSnippet();
    render(
      <HousesGridItem
        id={house.id}
        name={house.name}
        images={house.images}
        price_per_month={house.price_per_month}
      />,
    );

    screen.getByText(house.name);
    screen.getByText(new RegExp(house.price_per_month.toLocaleString()));
  });
});
