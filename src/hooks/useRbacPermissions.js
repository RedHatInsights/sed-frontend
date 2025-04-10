import { useQuery } from '@tanstack/react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { doesHavePermissions } from '@redhat-cloud-services/frontend-components-utilities/RBAC';

const getUserRbacPermissions = (permissions) => {
  return Promise.all(permissions).then((rawRbacPermissions) => {
    const permissions = rawRbacPermissions
      .flat()
      .map((rawPermission) => rawPermission.permission);

    const rbacPermissions = {
      canReadActivationKeys: doesHavePermissions(permissions, [
        'config-manager:activation_keys:read',
      ]),
      canWriteActivationKeys: doesHavePermissions(permissions, [
        'config-manager:activation_keys:write',
      ]),
      canReadInventory: doesHavePermissions(permissions, [
        'inventory:hosts:read',
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
