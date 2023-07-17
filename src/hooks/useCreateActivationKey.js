import { useMutation } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const activationKeyMutation = (token) => async (data) => {
  const { name, role, serviceLevel, usage, additionalRepositories } = data;

  const body = {
    name: name,
    role: role,
    serviceLevel: serviceLevel,
    usage: usage,
  };

  if (additionalRepositories) {
    body.additionalRepositories = additionalRepositories.map(
      (repositoryLabel) => ({ repositoryLabel })
    );
  }

  const response = await fetch('/api/rhsm/v2/activation_keys', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${await token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    throw new Error(
      `Status Code ${response.status}.  Error creating activation key: ${response.statusText}.`
    );
  }
  return response.json();
};

const useCreateActivationKey = () => {
  const chrome = useChrome();

  return useMutation(activationKeyMutation(chrome?.auth?.getToken()));
};

export { useCreateActivationKey as default };
