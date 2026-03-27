import React, { Suspense } from 'react';
import { render, waitFor } from '@testing-library/react';
import { RegistryContext } from '../../store';
import Dashboard from './index';
import useUser from '../../hooks/useUser';
import { useActions } from '../../store/actions';

const mockDispatch = jest.fn();
const mockRegister = jest.fn();
const mockFetchCurrState = jest.fn();
const mockFetchConnectedHosts = jest.fn();
const mockSaveCurrState = jest.fn();

let mockState;

jest.mock('../../hooks/useUser');
jest.mock('../../store/actions', () => ({
  useActions: jest.fn(),
}));

jest.mock('../../Components/Services/Services', () => ({
  __esModule: true,
  default: () => <div data-testid="services" />,
}));

jest.mock('../../Components/ConfirmChangesModal', () => ({
  __esModule: true,
  default: () => <div data-testid="confirm-changes-modal" />,
}));

jest.mock(
  '../../Components/AboutRemoteHostConfigPopover/AboutRemoteHostConfigPopover',
  () => ({
    __esModule: true,
    default: () => <div data-testid="about-popover" />,
  })
);

jest.mock(
  '@redhat-cloud-services/frontend-components-notifications/hooks',
  () => ({
    useAddNotification: () => jest.fn(),
  })
);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
  useSelector: (selector) => selector(mockState),
}));

const renderDashboard = () =>
  render(
    <RegistryContext.Provider
      value={{
        getRegistry: () => ({
          register: mockRegister,
        }),
      }}
    >
      <Suspense fallback={null}>
        <Dashboard />
      </Suspense>
    </RegistryContext.Provider>
  );

describe('Dashboard', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    global.insights = {
      chrome: {
        appAction: jest.fn(),
      },
    };
    mockState = {
      activeStateReducer: {
        loaded: true,
        values: {
          remediations: false,
          id: 'profile-id',
        },
      },
      connectedSystemsReducer: {
        total: 3,
      },
    };

    mockFetchCurrState.mockReturnValue({ type: 'GET_CURR_STATE' });
    mockFetchConnectedHosts.mockReturnValue({ type: 'GET_CONNECTED_HOSTS' });
    mockSaveCurrState.mockReturnValue({
      type: 'SET_CURR_STATE',
      payload: Promise.resolve(),
    });

    useActions.mockReturnValue({
      fetchCurrState: mockFetchCurrState,
      fetchConnectedHosts: mockFetchConnectedHosts,
      saveCurrState: mockSaveCurrState,
    });
  });

  it('fetches current state and connected hosts when the user can read config manager profiles and inventory hosts', async () => {
    useUser.mockReturnValue({
      data: {
        rbacPermissions: {
          canReadConfigManagerProfile: true,
          canReadInventoryHosts: true,
        },
      },
    });

    renderDashboard();

    await waitFor(() => expect(mockFetchCurrState).toHaveBeenCalledTimes(1));
    await waitFor(() =>
      expect(mockFetchConnectedHosts).toHaveBeenCalledTimes(1)
    );

    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_CURR_STATE' });
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_CONNECTED_HOSTS' });
  });

  it('skips connected-host fetches when the user can read config manager profiles but lacks inventory read access', async () => {
    useUser.mockReturnValue({
      data: {
        rbacPermissions: {
          canReadConfigManagerProfile: true,
          canReadInventoryHosts: false,
        },
      },
    });

    renderDashboard();

    await waitFor(() => expect(mockFetchCurrState).toHaveBeenCalledTimes(1));

    expect(mockRegister).toHaveBeenCalledTimes(1);
    expect(mockFetchConnectedHosts).not.toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'GET_CURR_STATE' });
    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: 'GET_CONNECTED_HOSTS',
    });
  });
});
