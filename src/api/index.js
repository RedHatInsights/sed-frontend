export const CONNECTOR_API_BASE = '/api/config-manager/v2';

import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { DefaultApi } from '@redhat-cloud-services/config-manager-client';

export * from './inventory';

export const useConfigApi = () => {
  const axiosInstance = useAxiosWithPlatformInterceptors();
  return new DefaultApi(undefined, CONNECTOR_API_BASE, axiosInstance);
};
