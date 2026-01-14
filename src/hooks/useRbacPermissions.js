import { useQuery } from '@tanstack/react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { doesHavePermissions } from '@redhat-cloud-services/frontend-components-utilities/RBAC';

const getUserRbacPermissions = (permissions) => {
  return Promise.all(permissions).then((rawRbacPermissions) => {
    const permissions = rawRbacPermissions
      .flat()
      .map((rawPermission) => rawPermission.permission);

    const rbacPermissions = {
      canReadConfigManagerProfile: doesHavePermissions(permissions, [
        'config-manager:profile:read',
      ]),
      canWriteConfigManagerProfile: doesHavePermissions(permissions, [
        'config-manager:profile:write',
      ]),
      canReadInventoryHosts: doesHavePermissions(permissions, [
        'inventory:hosts:read',
      ]),
      canWriteInventoryHosts: doesHavePermissions(permissions, [
        'inventory:hosts:write',
      ]),
    };

    return rbacPermissions;
  });
};

const useRbacPermissions = () => {
  const chrome = useChrome();
  const configManagerPermissions = chrome.getUserPermissions('config-manager');
  const inventoryPermissions = chrome.getUserPermissions('inventory');

  return useQuery(['rbac_permissions'], () =>
    getUserRbacPermissions([configManagerPermissions, inventoryPermissions])
  );
};

export { getUserRbacPermissions, useRbacPermissions };
