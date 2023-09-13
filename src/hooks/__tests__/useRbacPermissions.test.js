import { renderHook } from '@testing-library/react-hooks';
import { createQueryWrapper } from '../../utils/testHelpers';
import { useRbacPermissions } from '../useRbacPermissions';

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
  }),
}));

describe('useRbacPermissions', () => {
  let rbacObject = {
    canReadActivationKeys: true,
    canWriteActivationKeys: true,
    canReadInventory: true,
  };

  it('build and returns rbac permissions object from the API', async () => {
    const { result, waitFor } = renderHook(() => useRbacPermissions(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(rbacObject);
  });
});
