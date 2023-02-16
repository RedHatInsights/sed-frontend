import { useQuery } from 'react-query';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

const fetchAdditionalRepositories = async (keyName) => {
  if (!keyName) {
    return false;
  }
  const chrome = useChrome();
  const token = await chrome.auth.getToken();

  const response = await fetch(
    `/api/rhsm/v2/activation_keys/${keyName}/available_repositories?default=Disabled`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const repositoriesData = await response.json();

  return repositoriesData.body;
};

const getAvailableRepositories = async (keyName) => {
  const repositories = await fetchAdditionalRepositories(keyName);
  return repositories;
};

const useAvailableRepositories = (keyName) => {
  return useQuery(`activation_key_${keyName}_available_repositories`, () =>
    getAvailableRepositories(keyName)
  );
};

export { useAvailableRepositories as default };
