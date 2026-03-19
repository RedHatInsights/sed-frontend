import React from 'react';
import propTypes from 'prop-types';
import { PermissionContext } from './PermissionContext';
import { useRbacPermissions } from './hooks/useRbacPermissions';
import { DEFAULT_PERMISSIONS } from './permissions';

const PermissionsProvider = ({ children }) => {
  const { data = DEFAULT_PERMISSIONS, isLoading, error } = useRbacPermissions();

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

PermissionsProvider.propTypes = {
  children: propTypes.node,
};

export default PermissionsProvider;
