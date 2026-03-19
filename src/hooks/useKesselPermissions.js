import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchDefaultWorkspace,
  useSelfAccessCheck,
} from '@project-kessel/react-kessel-access-check';
import { getKesselAccessCheckParams } from '@redhat-cloud-services/frontend-components-utilities/kesselPermissions';
import {
  DEFAULT_PERMISSIONS,
  INVENTORY_HOST_WRITE_RELATIONS,
  KESSEL_RELATIONS,
  KESSEL_REQUIRED_RELATIONS,
} from '../permissions';

const getAllowed = (checks, relation) =>
  checks?.find(
    (check) => (check.relation ?? check.resource?.relation) === relation
  )?.allowed === true;

const useKesselPermissions = () => {
  const baseUrl = window.location.origin;
  const {
    data: defaultWorkspace,
    isLoading: workspaceLoading,
    error: workspaceError,
  } = useQuery(
    ['kessel', 'default-workspace'],
    () => fetchDefaultWorkspace(baseUrl),
    {
      staleTime: Infinity,
    }
  );
  const workspaceId = defaultWorkspace?.id;

  const checkParams = useMemo(
    () =>
      getKesselAccessCheckParams({
        requiredPermissions: KESSEL_REQUIRED_RELATIONS,
        resourceIdOrIds: workspaceId,
      }),
    [workspaceId]
  );

  const {
    data: checks = [],
    loading: checksLoading,
    error,
  } = useSelfAccessCheck(checkParams);

  if (workspaceLoading) {
    return {
      data: DEFAULT_PERMISSIONS,
      isLoading: true,
      error: null,
    };
  }

  if (!workspaceId || workspaceError || error) {
    return {
      data: DEFAULT_PERMISSIONS,
      isLoading: false,
      error: workspaceError || error,
    };
  }

  return {
    data: {
      canReadConfigManagerProfile: getAllowed(
        checks,
        KESSEL_RELATIONS.configManagerProfileRead
      ),
      canWriteConfigManagerProfile: getAllowed(
        checks,
        KESSEL_RELATIONS.configManagerProfileWrite
      ),
      canReadInventoryHosts: getAllowed(
        checks,
        KESSEL_RELATIONS.inventoryHostsRead
      ),
      // `inventory:hosts:write` maps to multiple Kessel relations
      canWriteInventoryHosts: INVENTORY_HOST_WRITE_RELATIONS.every((relation) =>
        getAllowed(checks, relation)
      ),
    },
    isLoading: checksLoading,
    error,
  };
};

export default useKesselPermissions;
