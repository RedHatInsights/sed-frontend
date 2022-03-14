import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../Loading';

it('renders correctly', () => {
  const { container } = render(<Loading />);
  expect(container).toMatchSnapshot();
});
