import React from 'react';
import { render, screen } from '@testing-library/react';

import ApiResourceRenderer from '../../components/ApiResourceRenderer';

describe('ApiResourceRenderer', () => {
  it('Should show the <Loader /> component when isLoading is true', () => {
    render(
      <ApiResourceRenderer
        isLoading
        loaderWidth="100%"
        error={null}
        empty={false}
        render={() => null}
      />,
    );

    screen.getByTestId('loader');
  });

  it("Should show an error message when isLoading is false and there's an error", () => {
    render(
      <ApiResourceRenderer
        isLoading={false}
        loaderWidth="100%"
        error="error"
        empty={false}
        render={() => null}
      />,
    );

    screen.getByText('error');
  });

  it('Should show an info message that no items were found when empty is true and isLoading is false', () => {
    render(
      <ApiResourceRenderer
        isLoading={false}
        loaderWidth="100%"
        error={null}
        empty
        render={() => null}
      />,
    );

    screen.getByText('No items were found!');
  });

  it("Render what's returned by the render prop when isLoading is false and there aren't any errors", () => {
    render(
      <ApiResourceRenderer
        isLoading={false}
        loaderWidth="100%"
        error={null}
        empty={false}
        render={() => <h1>Hello World</h1>}
      />,
    );

    screen.getByText('Hello World');
  });
});
