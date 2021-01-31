import React from 'react';
import { Route } from 'react-router-dom';
import faker from 'faker';

import HouseComponent from '../../components/House';

import { render } from '../utils';
import House from '../../routes/House';

jest.mock('../../components/House', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('House route', () => {
  it('Renders the house component with the appropriate houseId', () => {
    const id = faker.random.number();
    render(
      <Route path="/houses/:id" component={House} />,
      { initialRoute: `/houses/${id}` },
    );

    expect(HouseComponent).toHaveBeenCalledWith({ houseId: id }, {});
  });
});
