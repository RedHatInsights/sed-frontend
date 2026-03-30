import React from 'react';
import { render, screen } from '@testing-library/react';
import useUser from '../../../hooks/useUser';
import Authentication from '../Authentication';

jest.mock('../../../hooks/useUser');

const mockUserState = ({
  isLoading = false,
  isFetching = false,
  isSuccess = true,
  isError = false,
  rbacPermissions = {},
} = {}) => {
  useUser.mockReturnValue({
    isLoading,
    isFetching,
    isSuccess,
    isError,
    data: {
      accountNumber: '123',
      orgId: '123',
      rbacPermissions,
    },
  });
};

const renderAuthentication = () =>
  render(<Authentication>Authentication Test Content</Authentication>);

describe('Authentication', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders children when the user has config_manager_profile read permission', () => {
    mockUserState({
      rbacPermissions: {
        canReadConfigManagerProfile: true,
      },
    });

    renderAuthentication();

    expect(screen.getByText('Authentication Test Content')).toBeTruthy();
  });

  it('blocks the app when the user lacks config_manager_profile read permission', () => {
    mockUserState({
      rbacPermissions: {
        canReadConfigManagerProfile: false,
      },
    });

    renderAuthentication();

    expect(screen.queryByText('Authentication Test Content')).toBeNull();
  });

  it('shows a loading state while user data is still resolving', () => {
    mockUserState({
      isLoading: true,
      isSuccess: false,
    });

    const { container } = renderAuthentication();

    expect(container.querySelector('.pf-v6-c-spinner')).toBeTruthy();
  });

  it('shows unavailable state when user lookup fails', () => {
    mockUserState({
      isError: true,
    });

    renderAuthentication();

    expect(screen.queryByText('Authentication Test Content')).toBeNull();
  });
});
