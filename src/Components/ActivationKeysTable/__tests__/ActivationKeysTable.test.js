import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import ActivationKeysTable from '../ActivationKeysTable';
import useActivationKeys from '../../../hooks/useActivationKeys';
import { get, def } from 'bdd-lazy-var';

jest.mock('../../../hooks/useActivationKeys');
jest.mock('uuid', () => {
  return { v4: jest.fn(() => '00000000-0000-0000-0000-000000000000') };
});

const queryClient = new QueryClient();

const Table = () => (
  <QueryClientProvider client={queryClient}>
    <ActivationKeysTable />
  </QueryClientProvider>
);

describe('ActivationKeysTable', () => {
  def('loading', () => false);
  def('error', () => false);
  def('data', () => [
    {
      name: 'A',
      role: 'B',
      serviceLevel: 'C',
      usage: 'D',
    },
  ]);

  beforeEach(() => {
    useActivationKeys.mockReturnValue({
      isLoading: get('loading'),
      error: get('error'),
      data: get('data'),
    });
  });

  it('renders correctly', () => {
    const { container } = render(<Table />);

    expect(container).toMatchSnapshot();
  });

  describe('when loading', () => {
    def('loading', () => true);

    it('renders the loading state', () => {
      const { container } = render(<Table />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is an error', () => {
    def('error', () => true);

    it('renders the error state', () => {
      const { container } = render(<Table />);

      expect(container).toMatchSnapshot();
    });
  });
});
