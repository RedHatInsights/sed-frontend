import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import ActivationKeysTable from '../ActivationKeysTable';
import useActivationKeys from '../../../hooks/useActivationKeys';
import { get, def } from 'bdd-lazy-var';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
jest.mock('../../../hooks/useActivationKeys');
jest.mock('uuid', () => {
  return { v4: jest.fn(() => '00000000-0000-0000-0000-000000000000') };
});
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({ pathname: '/connector/test-key' }),
}));

const queryClient = new QueryClient();

const Table = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ActivationKeysTable onDelete={() => {}} />
    </QueryClientProvider>
  </BrowserRouter>
);

jest.mock(
  '@redhat-cloud-services/frontend-components/Unavailable',
  // eslint-disable-next-line react/display-name
  () => () => <div>Unavailable</div>
);

describe('ActivationKeysTable', () => {
  def('rbacPermissions', () => {
    return {
      rbacPermissions: {
        canReadActivationKeys: true,
        canWriteActivationKeys: true,
      },
    };
  });
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
    jest
      .spyOn(queryClient, 'getQueryData')
      .mockReturnValue(get('rbacPermissions'));
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

  describe('when user does not have write permissions', () => {
    def('rbacPermissions', () => {
      return {
        rbacPermissions: {
          canReadActivationKeys: true,
          canWriteActivationKeys: false,
        },
      };
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
