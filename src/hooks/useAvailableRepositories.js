import { useQuery } from 'react-query';

const fetchAdditionalRepositories = async (keyName) => {
  if (!keyName) {
    return false;
  }
  const token = await window.insights.chrome.auth.getToken();

  const response = await fetch(
    `/api/rhsm/v2/activation_keys/${keyName}/available_repositories`,
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
