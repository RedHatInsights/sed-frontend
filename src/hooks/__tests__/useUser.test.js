import { renderHook } from '@testing-library/react';
import useUser from '../useUser';
import usePermissions from '../usePermissions';
import { useAuthenticateUser } from '../../utils/platformServices';

jest.mock('../usePermissions');
jest.mock('../../utils/platformServices', () => ({
  useAuthenticateUser: jest.fn(),
}));

describe('useUser hook', () => {
  beforeEach(() => {
    usePermissions.mockReturnValue({
      permissions: {
        canReadConfigManagerProfile: true,
        canWriteConfigManagerProfile: true,
        canReadInventoryHosts: true,
        canWriteInventoryHosts: true,
      },
      isLoading: false,
    });
    useAuthenticateUser.mockReturnValue({
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      data: {
        identity: {
          account_number: '1',
          internal: {
            org_id: 1,
          },
        },
      },
    });
  });

  it('gets the user data and permissions', async () => {
    const { result } = renderHook(() => useUser());

    expect(result.current.data).toEqual({
      accountNumber: '1',
      orgId: 1,
      permissions: {
        canReadConfigManagerProfile: true,
        canWriteConfigManagerProfile: true,
        canReadInventoryHosts: true,
        canWriteInventoryHosts: true,
      },
      rbacPermissions: {
        canReadConfigManagerProfile: true,
        canWriteConfigManagerProfile: true,
        canReadInventoryHosts: true,
        canWriteInventoryHosts: true,
      },
    });
    expect(result.current.isSuccess).toBe(true);
  });

  it('keeps the same data reference across rerenders when inputs do not change', () => {
    const { result, rerender } = renderHook(() => useUser());
    const firstData = result.current.data;

    rerender();

    expect(result.current.data).toBe(firstData);
  });

  it('stays loading until permissions finish loading', () => {
    usePermissions.mockReturnValue({
      permissions: {
        canReadConfigManagerProfile: false,
        canWriteConfigManagerProfile: false,
        canReadInventoryHosts: false,
        canWriteInventoryHosts: false,
      },
      isLoading: true,
    });

    const { result } = renderHook(() => useUser());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isSuccess).toBe(false);
  });
});
