import { useMutation } from 'react-query';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

const additionalRepositoriesMutation = async (data) => {
  const { keyName, additionalRepos } = data;
  const chrome = useChrome();

  if (!keyName) {
    throw new Error(
      `Activation Key name must be provided to add additional repositiories.`
    );
  }
  const token = await chrome.auth.getToken();
  const response = await fetch(
    `/api/rhsm/v2/activation_keys/${keyName}/additional_repositories`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        additionalRepos.map((label) => ({
          repositoryLabel: label,
        }))
      ),
    }
  );
  return response.json();
};

const useAddAdditionalRepositories = () => {
  return useMutation(additionalRepositoriesMutation);
};

export { useAddAdditionalRepositories as default };
