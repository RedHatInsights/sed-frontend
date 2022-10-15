export const CONNECTOR_API_BASE = '/api/config-manager/v2';

import instance from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { DefaultApi } from '@redhat-cloud-services/config-manager-client';

export * from './inventory';

export const configApi = new DefaultApi(
  undefined,
  CONNECTOR_API_BASE,
  instance
);

export const updateCurrState = ({ compliance, remediations, active }) => {
  return configApi.createProfile({
    compliance,
    insights: true,
    remediations,
    active,
  });
};
