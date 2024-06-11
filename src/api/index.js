export const CONNECTOR_API_BASE = '/api/config-manager/v2';

import { useAxiosWithPlatformInterceptors } from '@redhat-cloud-services/frontend-components-utilities/interceptors';
import { DefaultApi } from '@redhat-cloud-services/config-manager-client';
import { useEffect, useRef, useState } from 'react';

export * from './inventory';

export const useConfigApi = () => {
  const axiosInstance = useAxiosWithPlatformInterceptors();
  return new DefaultApi(undefined, CONNECTOR_API_BASE, axiosInstance);
};

const dataTransformer = (data) => {
  if ('compliance' in data && 'remediations' in data && 'active' in data) {
    let mapped = {};
    Object.keys(data).forEach((key) => {
      data[key] === true
        ? (mapped[key] = 'enabled')
        : (mapped[key] = 'disabled');
    });
    return mapped;
  } else {
    return false;
  }
};

export const useGetPlaybookPreview = (data) => {
  const axios = useAxiosWithPlatformInterceptors();
  const [preview, setPreview] = useState();
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    const fetchData = async () => {
      try {
        const previewData = dataTransformer(data);
        const playbookPreview =
          previewData &&
          (await axios.post(`${CONNECTOR_API_BASE}/states/preview`, {
            compliance_openscap: previewData.compliance,
            insights: previewData.active,
            remediations: previewData.remediations,
          }));
        mounted.current && setPreview(playbookPreview);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    return () => {
      mounted.current = false;
    };
  }, [data]);

  return preview;
};
