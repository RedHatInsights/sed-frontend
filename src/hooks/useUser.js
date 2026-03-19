import { useMemo } from 'react';
import { useAuthenticateUser } from '../utils/platformServices';
import usePermissions from './usePermissions';

const useUser = () => {
  const authenticateUser = useAuthenticateUser();
  const { permissions, isLoading: permissionsLoading } = usePermissions();
  const data = useMemo(
    () =>
      authenticateUser.data && {
        accountNumber: authenticateUser.data.identity?.account_number,
        orgId: authenticateUser.data.identity?.internal?.org_id,
        permissions,
        rbacPermissions: permissions,
      },
    [authenticateUser.data, permissions]
  );

  return {
    ...authenticateUser,
    isLoading: authenticateUser.isLoading || permissionsLoading,
    isFetching: authenticateUser.isFetching || permissionsLoading,
    isSuccess: authenticateUser.isSuccess && !permissionsLoading,
    data,
  };
};

export default useUser;
