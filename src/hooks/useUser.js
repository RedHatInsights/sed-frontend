import { useQuery } from '@tanstack/react-query';
import { useAuthenticateUser } from '../utils/platformServices';

const useUser = () => {
  const authenticateUser = useAuthenticateUser();

  return useQuery(
    ['user'],
    () => ({
      accountNumber: authenticateUser?.data.identity?.account_number,
      orgId: authenticateUser?.data.identity?.internal?.org_id,
    }),
    {
      enabled: authenticateUser.isSuccess,
    }
  );
};

export default useUser;
