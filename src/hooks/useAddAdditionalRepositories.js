import { useMutation } from 'react-query';

const additionalRepositoriesMutation = async (data) => {
  const { keyName, selectedRepositories } = data;

  const additionalRepositoryLabels = selectedRepositories.map(
    (repository) => repository.repositoryLabel
  );

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
        additionalRepositoryLabels.map((label) => ({
          repositoryLabel: label,
        }))
      ),
    }
  );

  if (Math.floor(response.status / 100) !== 2) {
    throw new Error();
  }

  return response.json();
};

const useAddAdditionalRepositories = () => {
  return useMutation(additionalRepositoriesMutation);
};

export { useAddAdditionalRepositories as default };
