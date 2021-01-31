import React from 'react';
import { render } from '@testing-library/react';

import Loader from '../../containers/Loader';

describe('Loader Component', () => {
  test('Renders without crashing', () => {
    render(<Loader />);
  });
});
