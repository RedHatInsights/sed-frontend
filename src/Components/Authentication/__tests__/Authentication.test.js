import React from 'react';
import { render, waitFor } from '@testing-library/react';
import useUser from '../../../hooks/useUser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { get, def } from 'bdd-lazy-var';
import Authentication from '../Authentication';
import { RBACProvider } from '@redhat-cloud-services/frontend-components/RBACProvider';
import { usePermissionsWithContext } from '@redhat-cloud-services/frontend-components-utilities/RBACHook';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
}));
jest.mock('../../../hooks/useUser');
jest.mock(
  '@redhat-cloud-services/frontend-components-utilities/RBACHook',
  () => ({
    ...jest.requireActual(
      '@redhat-cloud-services/frontend-components-utilities/RBACHook'
    ),
    usePermissionsWithContext: jest.fn(),
  })
);

const queryClient = new QueryClient();

const mockAuthenticateUser = (isLoading = true, isError = false) => {
  const user = {
    accountNumber: '123',
    orgId: '123',
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
    <RBACProvider appName={null}>
      <Authentication>Authentication Test Content</Authentication>
    </RBACProvider>
  </QueryClientProvider>
);

describe('Authentication', () => {
  def('isLoading', () => false);
  def('isError', () => false);

  beforeEach(() => {
    jest.resetAllMocks();
    mockAuthenticateUser(get('isLoading'), get('isError'));
    usePermissionsWithContext.mockReturnValue({
      hasAccess: true,
    });
  });

  describe('with all permissions', () => {
    it('renders correctly with all permissions', async () => {
      const { container } = render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(container).toMatchSnapshot();
    });
  });

  describe('when user has some permissions', () => {
    it('renders content correctly', async () => {
      usePermissionsWithContext.mockImplementation((permissions) =>
        permissions.includes('config-manager:activation_keys:write')
          ? { hasAccess: false }
          : { hasAccess: true }
      );

      const { container } = render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(container).toMatchSnapshot();
    });
  });

  describe('when user has no permissions', () => {
    it('renders the NotAuthorized', async () => {
      usePermissionsWithContext.mockReturnValue({ hasAccess: false });

      const { container } = render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(container).toMatchSnapshot();
    });
  });
});
