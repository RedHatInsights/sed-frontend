import { renderHook, waitFor } from '@testing-library/react';
import { createQueryWrapper } from '../../utils/testHelpers';
import useKesselPermissions from '../useKesselPermissions';

const mockFetchDefaultWorkspace = jest.fn();
const mockUseSelfAccessCheck = jest.fn();

jest.mock('@project-kessel/react-kessel-access-check', () => ({
  fetchDefaultWorkspace: (...args) => mockFetchDefaultWorkspace(...args),
  useSelfAccessCheck: (...args) => mockUseSelfAccessCheck(...args),
}));

describe('useKesselPermissions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchDefaultWorkspace.mockResolvedValue({ id: 'default-workspace-id' });
    mockUseSelfAccessCheck.mockReturnValue({
      data: [
        { relation: 'config_manager_profile_view', allowed: true },
        { relation: 'config_manager_profile_edit', allowed: true },
        { relation: 'inventory_host_view', allowed: true },
        { relation: 'inventory_host_update', allowed: true },
        { relation: 'inventory_host_delete', allowed: true },
      ],
      loading: false,
      error: null,
    });
  });

  it('maps Kessel checks to the legacy permission shape', async () => {
    const { result } = renderHook(() => useKesselPermissions(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(mockFetchDefaultWorkspace).toHaveBeenCalledWith(
      window.location.origin
    );
    expect(mockUseSelfAccessCheck).toHaveBeenLastCalledWith({
      resources: [
        {
          id: 'default-workspace-id',
          type: 'workspace',
          relation: 'config_manager_profile_view',
          reporter: { type: 'rbac' },
        },
        {
          id: 'default-workspace-id',
          type: 'workspace',
          relation: 'config_manager_profile_edit',
          reporter: { type: 'rbac' },
        },
        {
          id: 'default-workspace-id',
          type: 'workspace',
          relation: 'inventory_host_view',
          reporter: { type: 'rbac' },
        },
        {
          id: 'default-workspace-id',
          type: 'workspace',
          relation: 'inventory_host_update',
          reporter: { type: 'rbac' },
        },
        {
          id: 'default-workspace-id',
          type: 'workspace',
          relation: 'inventory_host_delete',
          reporter: { type: 'rbac' },
        },
      ],
    });
    expect(result.current.data).toEqual({
      canReadConfigManagerProfile: true,
      canWriteConfigManagerProfile: true,
      canReadInventoryHosts: true,
      canWriteInventoryHosts: true,
    });
  });

  it('requires both inventory write relations to preserve the RBAC v1 gate', async () => {
    mockUseSelfAccessCheck.mockReturnValue({
      data: [
        { relation: 'config_manager_profile_view', allowed: true },
        { relation: 'config_manager_profile_edit', allowed: true },
        { relation: 'inventory_host_view', allowed: true },
        { relation: 'inventory_host_update', allowed: true },
        { relation: 'inventory_host_delete', allowed: false },
      ],
      loading: false,
      error: null,
    });

    const { result } = renderHook(() => useKesselPermissions(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data.canWriteInventoryHosts).toBe(false);
  });
});
