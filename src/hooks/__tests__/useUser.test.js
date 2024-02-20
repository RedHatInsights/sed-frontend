import { renderHook, waitFor } from '@testing-library/react';
import useUser from '../useUser';
import { createQueryWrapper } from '../../utils/testHelpers';

jest.mock('@redhat-cloud-services/frontend-components/useChrome', () => ({
  __esModule: true,
  default: () => ({
    getUserPermissions: () =>
      Promise.resolve([
        {
          resourceDefinitions: [],
          permission: 'config-manager:activation_keys:*',
        },
        {
          resourceDefinitions: [],
          permission: 'config-manager:activation_keys:read',
        },
        {
          resourceDefinitions: [],
          permission: 'inventory:hosts:read',
        },
      ]),
    auth: {
      getUser: () =>
        Promise.resolve({
          identity: {
            account_number: '1',
            type: 'User',
            user: {
              is_org_admin: true,
            },
            internal: {
              org_id: 1,
            },
          },
        }),
    },
  }),
}));

describe('useUser hook', () => {
  it('gets the user data and permissions', async () => {
    const { result } = renderHook(() => useUser(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      accountNumber: '1',
      orgId: 1,
      rbacPermissions: {
        canReadActivationKeys: true,
        canWriteActivationKeys: true,
        canReadInventory: true,
      },
    });
  });
});
