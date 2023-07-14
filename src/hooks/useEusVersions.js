import { useQuery } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const fetchEusVersions = (token) => async () => {
  const response = await fetch(
    '/api/rhsm/v2/products/RHEL/extended-update-support-products',
    {
      headers: { Authorization: `Bearer ${await token}` },
    }
  );

  if (!response.ok) {
    return Promise.reject(response.status);
  }

  const eusVersionsData = await response.json();

  return eusVersionsData.body;
};

const useEusVersions = () => {
  const chrome = useChrome();

  return useQuery({
    queryKey: 'eus_versions',
    queryFn: () => fetchEusVersions(chrome?.auth?.getToken())(),
    retry: (failureCount, error) => {
      if (failureCount < 3 && error != '400') {
        return true;
      }
      return false;
    },
  });
};

export { useEusVersions as default };
