import { useMutation } from '@tanstack/react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const additionalRepositoriesMutation = (token) => async (data) => {
  const { keyName, selectedRepositories } = data;

  const additionalRepositoryLabels = selectedRepositories.map(
    (repository) => repository.repositoryLabel
  );

  if (!keyName) {
    throw new Error(
      `Activation Key name must be provided to add additional repositiories.`
    );
  }

  const response = await fetch(
    `/api/rhsm/v2/activation_keys/${keyName}/additional_repositories`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await token}`,
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
  const chrome = useChrome();

  return useMutation(additionalRepositoriesMutation(chrome?.auth?.getToken()));
};

export { useAddAdditionalRepositories as default };
