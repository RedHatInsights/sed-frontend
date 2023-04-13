import { renderHook } from '@testing-library/react-hooks';
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
    const { result, waitFor } = renderHook(() => useUser(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({
      accountNumber: '1',
      orgId: 1,
      rbacPermissions: {
        canReadActivationKeys: true,
        canWriteActivationKeys: true,
      },
    });
  });
});
