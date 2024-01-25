import { useQuery } from 'react-query';
import { useRbacPermissions } from './useRbacPermissions';
import { useAuthenticateUser } from '../utils/platformServices';

const useUser = () => {
  const rbacPermissions = useRbacPermissions();
  console.log(rbacPermissions, "rbacPermissions");
  const authenticateUser = useAuthenticateUser();
  console.log(authenticateUser, "authenticateUser");

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
