export const DEFAULT_PERMISSIONS = {
  canReadConfigManagerProfile: false,
  canWriteConfigManagerProfile: false,
  canReadInventoryHosts: false,
  canWriteInventoryHosts: false,
};

export const KESSEL_RELATIONS = {
  configManagerProfileRead: 'config_manager_profile_view',
  configManagerProfileWrite: 'config_manager_profile_edit',
  inventoryHostsRead: 'inventory_host_view',
  inventoryHostsWriteUpdate: 'inventory_host_update',
  inventoryHostsWriteDelete: 'inventory_host_delete',
};

export const KESSEL_REQUIRED_RELATIONS = Object.values(KESSEL_RELATIONS);

export const INVENTORY_HOST_WRITE_RELATIONS = [
  KESSEL_RELATIONS.inventoryHostsWriteUpdate,
  KESSEL_RELATIONS.inventoryHostsWriteDelete,
];
