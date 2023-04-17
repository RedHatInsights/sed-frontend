import { useQuery } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const fetchAdditionalRepositories = async (
  token,
  keyName,
  offset = 0,
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

  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }

  const repositoriesData = await response.json();
  const repositories = repositoriesData.body;

  if (repositories.length === 0) {
    return allRepositories;
  } else {
    const nextOffset = offset + repositories.length;
    return fetchAdditionalRepositories(
      token,
      keyName,
      nextOffset,
      allRepositories.concat(repositories)
    );
  }
};

const useAvailableRepositories = (keyName) => {
  const chrome = useChrome();
  const token = chrome?.auth?.getToken();

  return useQuery(`activation_key_${keyName}_available_repositories`, () =>
    fetchAdditionalRepositories(token, keyName)
  );
};

export { useAvailableRepositories as default };
