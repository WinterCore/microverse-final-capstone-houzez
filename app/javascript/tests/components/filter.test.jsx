import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { Route } from 'react-router-dom';
import fireEvent from '@testing-library/user-event';
import queryString from 'query-string';

import Filter from '../../components/Filter';

import axios from '../../api/index';
import * as data from '../data';

import { render } from '../utils';

jest.mock('../../api/index', () => ({
  __esModule: true,
  default: jest.fn(),
  GET_HOUSE_TYPES: jest.fn(),
}));

describe('Filter Component', () => {
  test('Fetches and renders all house types from an external api', async () => {
    const houseTypes = [data.houseType()];
    axios.mockResolvedValueOnce({ data: { data: houseTypes } });
    render(<Filter />);

    await waitFor(() => {
      for (let i = 0; i < houseTypes.length; i += 1) {
        const houseType = houseTypes[i];
        screen.getByText(houseType.name);
      }
    });
  });

  test('Updates the type url parameter when a filter is clicked', async () => {
    const houseTypes = [data.houseType(), data.houseType()];
    axios.mockResolvedValueOnce({ data: { data: houseTypes } });

    const HouseTypes = ({ location: { search } }) => {
      const id = +queryString.parse(search).type;

      return houseTypes.map(x => (x.id === id ? (
        <div key={x.name}>
          CONTENT
          {x.name}
        </div>
      ) : <div key={x.name} />));
    };

    render(
      <>
        <Filter />
        <Route path="/" component={HouseTypes} />
      </>,
    );

    await waitFor(() => {
      for (let i = 0; i < houseTypes.length; i += 1) {
        const houseType = houseTypes[i];
        fireEvent.click(screen.getByText(houseType.name));

        screen.getByText(`CONTENT ${houseType.name}`);
      }
    });
  });
});
