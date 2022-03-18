import { renderHook } from '@testing-library/react-hooks';
import { createQueryWrapper } from '../../utils/testHelpers';
import useRbacPermissions from '../useRbacPermissions';

describe('useRbacPermissions', () => {
  const rbacData = [
    {
      resourceDefinitions: [],
      permission: 'config-manager:activation_keys:*',
    },
    {
      resourceDefinitions: [],
      permission: 'config-manager:activation_keys:read',
    },
  ];

  let rbacObject = { canReadActivationKeys: true };

  beforeEach(() => {
    Object.defineProperty(window, 'insights', {
      value: {
        chrome: {
          getUserPermissions: jest.fn(() => rbacData),
        },
      },
    });
  });
  it('build and returns rbac permissions object from the API', async () => {
    const { result, waitFor } = renderHook(() => useRbacPermissions(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(rbacObject);
  });
});
