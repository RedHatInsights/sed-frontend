import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ActivationKeys from '../index';
import { Provider } from 'react-redux';
import Authentication from '../../../Components/Authentication';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useUser from '../../../hooks/useUser';
import { get, def } from 'bdd-lazy-var';
import useActivationKeys from '../../../hooks/useActivationKeys';
import '@testing-library/jest-dom';
import { RBACProvider } from '@redhat-cloud-services/frontend-components/RBACProvider';
import { usePermissionsWithContext } from '@redhat-cloud-services/frontend-components-utilities/RBACHook';
jest.mock('../../../hooks/useActivationKeys');
jest.mock('../../../hooks/useUser');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
}));
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

const PageContainer = () => (
  <QueryClientProvider client={queryClient}>
    <RBACProvider appName={null}>
      <Authentication>
        <Provider store={init().getStore()}>
          <Router>
            <ActivationKeys />
          </Router>
        </Provider>
      </Authentication>
    </RBACProvider>
  </QueryClientProvider>
);

const mockAuthenticateUser = (isLoading, isError) => {
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

// eslint-disable-next-line react/display-name
jest.mock('../../../Components/ActivationKeysTable', () => () => (
  <div>Activation Keys Table</div>
));
jest.mock(
  '@redhat-cloud-services/frontend-components/NotAuthorized',
  // eslint-disable-next-line react/display-name
  () => () => <div>Not Authorized</div>
);

jest.mock(
  '@redhat-cloud-services/frontend-components/Unavailable',
  // eslint-disable-next-line react/display-name
  () => () => <div>Unavailable</div>
);

describe('ActivationKeys', () => {
  def('isLoading', () => false);
  def('isError', () => false);
  def('keysData', () => [
    {
      name: 'A',
      role: 'B',
      serviceLevel: 'C',
      usage: 'D',
    },
  ]);

  beforeEach(() => {
    jest.resetAllMocks();
    mockAuthenticateUser(get('isLoading'), get('isError'));
    useActivationKeys.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      isSuccess: true,
      data: get('keysData'),
    });

    usePermissionsWithContext.mockReturnValue({
      hasAccess: true,
    });
  });

  it('renders correctly', async () => {
    const { container } = render(<PageContainer />);
    await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
    expect(container).toMatchSnapshot();
  });

  describe('when the user call fails', () => {
    def('isError', () => true);

    it('renders an error message when user call fails', async () => {
      const { container } = render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(container).toMatchSnapshot();
    });
  });

  describe('when the user does not have proper permissions', () => {
    it('redirects to not authorized page', async () => {
      usePermissionsWithContext.mockReturnValue({
        hasAccess: false,
      });

      const { container } = render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(container).toMatchSnapshot();
    });
  });

  describe('when the user have only read permissions', () => {
    it('create activation key button is disabled', async () => {
      usePermissionsWithContext.mockImplementation((permissions) =>
        permissions.includes('config-manager:activation_keys:write')
          ? { hasAccess: false }
          : { hasAccess: true }
      );

      render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(screen.getByText('Create activation key')).toBeDisabled();
    });
  });

  describe('show blank state when no activation keys', () => {
    def('keysData', () => []);

    it('renders blank state', async () => {
      render(<PageContainer />);

      await waitFor(() =>
        expect(screen.getByText('No activation keys')).toBeInTheDocument()
      );
    });
  });
});
