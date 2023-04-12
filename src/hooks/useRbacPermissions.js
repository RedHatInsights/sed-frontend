import { useQuery } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const getUserRbacPermissions = (permissions) => {
  return permissions.then((rawRbacPermissions) => {
    const permissions = rawRbacPermissions.map(
      (rawPermission) => rawPermission.permission
    );
    const rbacPermissions = {
      canReadActivationKeys:
        permissions.includes('config-manager:activation_keys:read') ||
        permissions.includes('config-manager:activation_keys:*'),
      canWriteActivationKeys:
        permissions.includes('config-manager:activation_keys:write') ||
        permissions.includes('config-manager:activation_keys:*'),
    };

    return rbacPermissions;
  });
};

const useRbacPermissions = () => {
  const chrome = useChrome();
  const permissions = chrome.getUserPermissions('config-manager');

  return useQuery('rbac_permissions', () =>
    getUserRbacPermissions(permissions)
  );
};

export { getUserRbacPermissions, useRbacPermissions };
