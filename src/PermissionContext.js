import { createContext } from 'react';
import { DEFAULT_PERMISSIONS } from './permissions';

export const PermissionContext = createContext({
  permissions: DEFAULT_PERMISSIONS,
  isLoading: true,
  error: null,
});
