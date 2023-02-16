import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { useQuery } from 'react-query';

const getUser = (newUser, permissions) => {
  const user = {
    accountNumber: newUser?.accountNumber,
    orgId: newUser?.internal?.org_id,
    rbacPermissions: permissions,
  };
  return user;
};

const useUser = () => {
  const chrome = useChrome();
  const newUser =  Promise.resolve(chrome.auth.getUser()).then((res)=> res.identity)
  const permissions =  Promise.resolve(chrome.getUserPermissions('config-manager')).then((res)=> res.map(({permission})=> permission));
  return useQuery('user', () => getUser(newUser,permissions));
};

export { getUser, useUser as default };
