import { useQuery, UseQueryResult } from 'react-query';
import { getUserRbacPermissions } from '../hooks/useRbacPermissions';
import { authenticateUser } from '../utils/platformServices';

const getUser = () => {
  return Promise.all([authenticateUser(), getUserRbacPermissions()]).then(
    ([userStatus, rbacPermissions]) => {
      const user = {
        accountNumber: userStatus.identity.account_number,
        orgId: userStatus?.identity?.internal?.org_id,
        rbacPermissions: rbacPermissions,
      };
      return user;
    }
  );
};

const useUser = () => {
  return useQuery('user', () => getUser());
};

export { getUser, useUser as default };
