import React from 'react';
import { render, waitFor } from '@testing-library/react';
import useUser from '../../../hooks/useUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { get, def } from 'bdd-lazy-var';
import Authentication from '../Authentication';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
}));
jest.mock('../../../hooks/useUser');

const queryClient = new QueryClient();

const mockAuthenticateUser = (
  isLoading = true,
  isError = false,
  rbacPermissions = {}
) => {
  const user = {
    accountNumber: '123',
    orgId: '123',
    rbacPermissions: rbacPermissions,
  };
  useUser.mockReturnValue({
    isLoading: isLoading,
    isFetching: false,
    isSuccess: true,
    isError: isError,
    data: user,
  });

  if (isError === false) {
    queryClient.setQueryData(['user'], user);
  }
};

const PageContainer = () => (
  <QueryClientProvider client={queryClient}>
    <Authentication>Authentication Test Content</Authentication>
  </QueryClientProvider>
);

describe('Authentication', () => {
  def('isLoading', () => false);
  def('isError', () => false);
  def('rbacPermissions', () => ({}));

  beforeEach(() => {
    jest.resetAllMocks();
    mockAuthenticateUser(
      get('isLoading'),
      get('isError'),
      get('rbacPermissions')
    );
  });

  describe('with all permissions', () => {
    def('rbacPermissions', () => {
      return {
        canReadConfigManagerProfile: false,
        canWriteConfigManagerProfile: true,
      };
    });

    it('renders correctly with all permissions', async () => {
      const { container } = render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(container).toMatchSnapshot();
    });
  });

  describe('when user has some permissions', () => {
    def('rbacPermissions', () => {
      return {
        canReadConfigManagerProfile: false,
        canWriteConfigManagerProfile: true,
      };
    });

    it('renders content correctly', async () => {
      const { container } = render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(container).toMatchSnapshot();
    });
  });

  describe('when user has no permissions', () => {
    def('rbacPermissions', () => {
      return {
        canReadConfigManagerProfile: false,
        canWriteConfigManagerProfile: false,
      };
    });

    it('renders the NotAuthorized', async () => {
      const { container } = render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(container).toMatchSnapshot();
    });
  });
});
