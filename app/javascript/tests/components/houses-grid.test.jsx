import React from 'react';
import faker from 'faker';
import { screen, waitFor } from '@testing-library/react';

import HousesGrid from '../../components/HousesGrid';

import axios from '../../api/index';
import * as data from '../data';

import { render } from '../utils';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_HOUSES: jest.fn(),
}));

describe('HousesGrid Component', () => {
  test('Fetches the houses from an external api based on the type in the url\'s params and renders them', async () => {
    const houses = Array.from({ length: 15 }).map(() => data.houseSnippet());
    const type = faker.random.number();
    axios.mockResolvedValueOnce({ data: { data: houses } });
    render(
      <div id="scrollable"><HousesGrid /></div>,
      { initialRoute: `/?type=${type}` },
    );

    expect(axios).toHaveBeenCalledWith({ params: { type, page: 1 } });

    await waitFor(() => {
      for (let i = 0; i < houses.length; i += 1) {
        const house = houses[i];
        screen.getByText(house.name);
      }
    });
  });
});
