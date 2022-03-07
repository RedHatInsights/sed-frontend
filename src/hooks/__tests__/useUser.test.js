import { renderHook } from '@testing-library/react-hooks';
import { authenticateUser } from '../../utils/platformServices';
import { getUserRbacPermissions } from '../useRbacPermissions';
import useUser from '../useUser';
import { createQueryWrapper } from '../../utils/testHelpers';

jest.mock('../../utils/platformServices', () => ({
  ...jest.requireActual('../../utils/platformServices'),
  authenticateUser: jest.fn(),
}));

jest.mock('../useRbacPermissions', () => ({
  ...jest.requireActual('../useRbacPermissions'),
  getUserRbacPermissions: jest.fn(),
}));

describe('useUser hook', () => {
  const rbacData = { canReadActivationKeys: true };
  it('gets the user data and permissions', async () => {
    console.log(authenticateUser);
    authenticateUser.mockResolvedValue({
      identity: {
        account_number: 1,
        internal: {
          org_id: 1,
        },
      },
    });

    getUserRbacPermissions.mockResolvedValue(rbacData);

    const { result, waitFor } = renderHook(() => useUser(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({
      accountNumber: 1,
      orgId: 1,
      rbacPermissions: rbacData,
    });
  });
});
