export const CONNECTOR_API_BASE = '/api/config-manager/v2';

import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { DefaultApi } from '@redhat-cloud-services/config-manager-client';
import { useEffect, useRef, useState } from 'react';

export * from './inventory';

export const useConfigApi = () => {
  const axiosInstance = useAxiosWithPlatformInterceptors();
  return new DefaultApi(undefined, CONNECTOR_API_BASE, axiosInstance);
};

export const useGetPlaybookPreview = (profileId) => {
  const configApi = useConfigApi();
  const [preview, setPreview] = useState();
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    const fetchData = async () => {
      try {
        const playbookPreview = await configApi.getPlaybook(profileId);
        mounted.current && setPreview(playbookPreview);
      } catch (error) {
        console.error(error);
      }
    };

    profileId && fetchData();
    return () => {
      mounted.current = false;
    };
  }, [profileId]);

  return preview;
};
