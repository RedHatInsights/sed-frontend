import React from 'react';
import propTypes from 'prop-types';
import { PermissionContext } from './PermissionContext';
import useKesselPermissions from './hooks/useKesselPermissions';
import { DEFAULT_PERMISSIONS } from './permissions';

const PermissionsProviderKessel = ({ children }) => {
  const {
    data = DEFAULT_PERMISSIONS,
    isLoading,
    error,
  } = useKesselPermissions();

  return (
    <PermissionContext.Provider
      value={{
        permissions: data,
        isLoading,
        error,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

PermissionsProviderKessel.propTypes = {
  children: propTypes.node,
};

export default PermissionsProviderKessel;
