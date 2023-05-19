import { useQuery } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const fetchReleaseVersions = (token) => async () => {
  const response = await fetch(`/api/rhsm/v2/products/RHEL/extended-update-support-versions`, {
    headers: { Authorization: `Bearer ${await token}` },
  });

  const releaseVersions = await response.json();

  return releaseVersions.body;
};

const getReleaseVersions = (token) => async (keyName) => {
  const keysData = await fetchReleaseVersions(token)(keyName);
  return keysData;
};

const useReleaseVersions = (keyName) => {
  const chrome = useChrome();

  return useQuery(`activation_key_${keyName}`, () =>
    getReleaseVersions(chrome?.auth?.getToken())(keyName)
  );
};

export { useReleaseVersions as default };
