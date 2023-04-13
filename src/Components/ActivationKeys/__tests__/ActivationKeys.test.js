import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ActivationKeys from '../index';
import { Provider } from 'react-redux';
import Authentication from '../../../Components/Authentication';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import useUser from '../../../hooks/useUser';
import { get, def } from 'bdd-lazy-var';
import useActivationKeys from '../../../hooks/useActivationKeys';
import '@testing-library/jest-dom';
import useFeatureFlag from '../../../hooks/useFeatureFlag';
jest.mock('../../../hooks/useActivationKeys');
jest.mock('../../../hooks/useUser');
jest.mock('../../../hooks/useFeatureFlag');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
  }),
}));

const queryClient = new QueryClient();

const PageContainer = () => (
  <QueryClientProvider client={queryClient}>
    <Authentication>
      <Provider store={init().getStore()}>
        <Router>
          <ActivationKeys />
        </Router>
      </Provider>
    </Authentication>
  </QueryClientProvider>
);

const mockAuthenticateUser = (isLoading, isError, rbacPermissions) => {
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
    queryClient.setQueryData('user', user);
  }
};

// eslint-disable-next-line react/display-name
jest.mock('../../../Components/ActivationKeysTable', () => () => (
  <div>Activation Keys Table</div>
));
// eslint-disable-next-line react/display-name
jest.mock('../no-access', () => () => <div>Not Authorized</div>);

jest.mock(
  '@redhat-cloud-services/frontend-components/Unavailable',
  // eslint-disable-next-line react/display-name
  () => () => <div>Unavailable</div>
);

useFeatureFlag.mockReturnValue(true);

describe('ActivationKeys', () => {
  def('isLoading', () => false);
  def('isError', () => false);
  def('rbacPermissions', () => {
    return { canReadActivationKeys: true, canWriteActivationKeys: true };
  });
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
    mockAuthenticateUser(
      get('isLoading'),
      get('isError'),
      get('rbacPermissions')
    );
    useActivationKeys.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      isSuccess: true,
      data: get('keysData'),
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
    def('rbacPermissions', () => {
      return { canReadActivationKeys: false };
    });

    it('redirects to not authorized page', async () => {
      const { container } = render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(container).toMatchSnapshot();
    });
  });

  describe('when the user have only read permissions', () => {
    def('rbacPermissions', () => {
      return { canReadActivationKeys: true, canWriteActivationKeys: false };
    });

    it('create activation key button is disabled', async () => {
      render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(screen.getByText('Create activation key')).toBeDisabled();
    });
  });

  describe('show blank state when no activation keys', () => {
    def('keysData', () => []);

    it('renders blank state', async () => {
      render(<PageContainer />);
      expect(screen.getByText('No activation keys')).toBeInTheDocument();
    });
  });
});
