export const CONNECTOR_API_BASE = '/api/config-manager/v1';

import instance from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { DefaultApi } from '@redhat-cloud-services/config-manager-client';

export const configApi = new DefaultApi(
  undefined,
  CONNECTOR_API_BASE,
  instance
);

export const updateCurrState = ({
  useOpenSCAP,
  useAnalysis,
  enableCloudConnector,
}) => {
  return configApi.updateStates({
    compliance_openscap: useOpenSCAP ? 'enabled' : 'disabled',
    insights: useAnalysis ? 'enabled' : 'disabled',
    remediations: enableCloudConnector ? 'enabled' : 'disabled',
  });
};
