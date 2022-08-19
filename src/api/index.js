export const CONNECTOR_API_BASE = '/api/config-manager/v1';

import instance from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { DefaultApi } from '@redhat-cloud-services/config-manager-client';

export * from './inventory';

export const configApi = new DefaultApi(
  undefined,
  CONNECTOR_API_BASE,
  instance
);

const updateManager = (apply_state) => {
  return instance.post(`${CONNECTOR_API_BASE}/manage`, apply_state, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateCurrState = ({
  useOpenSCAP,
  enableCloudConnector,
  apply_state,
}) => {
  return Promise.all([
    configApi.updateStates({
      compliance_openscap: useOpenSCAP ? 'enabled' : 'disabled',
      insights: 'enabled',
      remediations: enableCloudConnector ? 'enabled' : 'disabled',
    }),
    updateManager(apply_state),
  ]);
};
