export const CONNECTOR_API_BASE = '/api/config-manager/v1';

import instance from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { DefaultApi } from '@redhat-cloud-services/config-manager-client';

export * from './inventory';

export const configApi = new DefaultApi(
  undefined,
  CONNECTOR_API_BASE,
  instance
);

export const updateCurrState = ({
  useOpenSCAP,
  enableCloudConnector,
  hasInsights,
}) => {
  return configApi.updateStates({
    compliance_openscap: useOpenSCAP ? 'enabled' : 'disabled',
    insights:
      useOpenSCAP || enableCloudConnector || hasInsights
        ? 'enabled'
        : 'disabled',
    remediations: enableCloudConnector ? 'enabled' : 'disabled',
  });
};
