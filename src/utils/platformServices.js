import { useQuery } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const useAuthenticateUser = () => {
  const chrome = useChrome();

  return useQuery('authenticated-user', () => {
    try {
      return chrome?.auth?.getUser();
    } catch (e) {
      throw new Error(`Error authenticating user: ${e.message}`);
    }
  });
};

export { useAuthenticateUser };
