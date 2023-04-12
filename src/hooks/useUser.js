import { useQuery } from 'react-query';
import { useRbacPermissions } from './useRbacPermissions';
import { useAuthenticateUser } from '../utils/platformServices';

const useUser = () => {
  const rbacPermissions = useRbacPermissions();
  const authenticateUser = useAuthenticateUser();

  return useQuery(
    'user',
    () =>
      Promise.all([authenticateUser, rbacPermissions]).then(
        ([userStatus, rbacPermissions]) => ({
          accountNumber: userStatus?.data.identity?.account_number,
          orgId: userStatus?.data.identity?.internal?.org_id,
          rbacPermissions: rbacPermissions?.data,
        })
      ),
    {
      enabled: rbacPermissions.isSuccess,
    }
  );
};

export default useUser;
