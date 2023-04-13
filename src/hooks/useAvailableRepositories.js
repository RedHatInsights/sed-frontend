import { useQuery } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const fetchAdditionalRepositories = async (
  keyName,
  offset,
  allRepositories = []
) => {
  if (!keyName) {
    return false;
  }

  const response = await fetch(
    `/api/rhsm/v2/activation_keys/${keyName}/available_repositories?default=Disabled&offset=${offset}`,
    {
      headers: { Authorization: `Bearer ${await token}` },
    }
  );

  const repositoriesData = await response.json();
  const repositories = repositoriesData.body;

  if (repositories.length === 0) {
    return allRepositories;
  } else {
    const nextOffset = offset + repositories.length;
    return fetchAdditionalRepositories(
      keyName,
      nextOffset,
      allRepositories.concat(repositories)
    );
  }
};

const getAvailableRepositories = async (keyName) => {
  const repositories = await fetchAdditionalRepositories(keyName, 0);
  return repositories;
};

const useAvailableRepositories = (keyName) => {
  const chrome = useChrome();

  return useQuery(`activation_key_${keyName}_available_repositories`, () =>
    getAvailableRepositories(chrome?.auth?.getToken())(keyName)
  );
};

export { useAvailableRepositories as default };
