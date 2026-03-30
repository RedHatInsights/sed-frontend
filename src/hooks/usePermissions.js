import { useContext } from 'react';
import { PermissionContext } from '../PermissionContext';

const usePermissions = () => useContext(PermissionContext);

export default usePermissions;
