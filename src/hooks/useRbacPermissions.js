import { useQuery } from 'react-query';

const getUserRbacPermissions = async () => {
  return Promise.resolve(
    window.insights.chrome.getUserPermissions('config-manager')
  ).then((rawRbacPermissions) => {
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
  return useQuery('rbac_permissions', () => getUserRbacPermissions());
};

export { getUserRbacPermissions, useRbacPermissions as default };
