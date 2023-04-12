import { useQuery } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const fetchAdditionalRepositories = (token) => async (keyName) => {
  if (!keyName) {
    return false;
  }

  const response = await fetch(
    `/api/rhsm/v2/activation_keys/${keyName}/available_repositories?default=Disabled`,
    {
      headers: { Authorization: `Bearer ${await token}` },
    }
  );

  const repositoriesData = await response.json();

  return repositoriesData.body;
};

const getAvailableRepositories = (token) => async (keyName) => {
  const repositories = await fetchAdditionalRepositories(token)(keyName);
  return repositories;
};

const useAvailableRepositories = (keyName) => {
  const chrome = useChrome();

  return useQuery(`activation_key_${keyName}_available_repositories`, () =>
    getAvailableRepositories(chrome?.auth?.getToken())(keyName)
  );
};

export { useAvailableRepositories as default };
