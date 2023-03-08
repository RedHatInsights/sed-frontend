import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ActivationKey from '../index';
import { Provider } from 'react-redux';
import Authentication from '../../../Components/Authentication';
import { BrowserRouter as Router } from 'react-router-dom';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import useUser from '../../../hooks/useUser';
import { get, def } from 'bdd-lazy-var';
import useActivationKey from '../../../hooks/useActivationKey';
import '@testing-library/jest-dom';
import useFeatureFlag from '../../../hooks/useFeatureFlag';
jest.mock('../../../hooks/useActivationKey');
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
          <ActivationKey />
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
  useFeatureFlag.mockReturnValue(true);
  if (isError === false) {
    queryClient.setQueryData('user', user);
  }
};

// eslint-disable-next-line react/display-name
jest.mock('../../../Components/AdditionalRepositoriesTable', () => () => (
  <div>Additional Repositories Table</div>
));
// eslint-disable-next-line react/display-name
jest.mock('../../../Components/shared/breadcrumbs', () => () => (
  <div>Breadcrumbs</div>
));
// eslint-disable-next-line react/display-name
jest.mock('../../ActivationKeys/no-access', () => () => (
  <div>Not Authorized</div>
));

jest.mock(
  '@redhat-cloud-services/frontend-components/Unavailable',
  // eslint-disable-next-line react/display-name
  () => () => <div>Unavailable</div>
);

describe('ActivationKey', () => {
  def('isLoading', () => false);
  def('isError', () => false);
  def('rbacPermissions', () => {
    return { canReadActivationKeys: true, canWriteActivationKeys: true };
  });
  def('keyData', () => {
    return {
      name: 'A',
      role: 'B',
      serviceLevel: 'C',
      usage: 'D',
      additionalRepositories: [],
      releaseVersion: 1,
    };
  });

  beforeEach(() => {
    window.insights = {};
    jest.resetAllMocks();
    mockAuthenticateUser(
      get('isLoading'),
      get('isError'),
      get('rbacPermissions')
    );
    useActivationKey.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isError: false,
      isSuccess: true,
      data: get('keyData'),
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
      render(<PageContainer />);
      await waitFor(() => expect(useUser).toHaveBeenCalledTimes(1));
      expect(screen.getByText('Not Authorized')).toBeInTheDocument();
    });
  });
});
