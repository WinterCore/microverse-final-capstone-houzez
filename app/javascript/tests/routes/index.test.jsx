import React from 'react';

import Filter from '../../components/Filter';
import HousesGrid from '../../components/HousesGrid';

import { render } from '../utils';
import Index from '../../routes/Index';

jest.mock('../../components/HousesGrid', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

jest.mock('../../components/Filter', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('Index route', () => {
  it('Renders the correct children', () => {
    render(<Index />);

    expect(Filter).toHaveBeenCalled();
    expect(HousesGrid).toHaveBeenCalled();
  });
});
