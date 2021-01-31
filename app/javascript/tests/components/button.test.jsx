import React from 'react';
import { render, screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';

import Button from '../../components/Button';

describe('ApiResourceRenderer', () => {
  it('Should render correctly', () => {
    render(<Button>Hello</Button>);

    screen.getByText('Hello');
  });

  it('Should render a loader when loading is set to true', () => {
    render(<Button loading>Hello</Button>);

    screen.getByTestId('loader');
  });

  it('Should ignore clicks when disabled is set to true', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Hello</Button>);

    fireEvent.click(screen.getByText('Hello'));
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
