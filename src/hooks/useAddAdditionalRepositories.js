import { useMutation } from 'react-query';

const additionalRepositoriesMutation = async (data) => {
  const { keyName, additionalRepos } = data;
  if (!keyName) {
    throw new Error(
      `Activation Key name must be provided to add additional repositiories.`
    );
  }
  const token = await window.insights.chrome.auth.getToken();
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
