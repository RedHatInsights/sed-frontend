import { useMutation } from '@tanstack/react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const deleteActivationKeyMutation = (token) => async (name) => {
  const response = await fetch(`/api/rhsm/v2/activation_keys/${name}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${await token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(
      `Status Code ${response.status}.  Error deleting activation key: ${response.statusText}.`
    );
  }
};

const useDeleteActivationKey = () => {
  const chrome = useChrome();

  return useMutation(deleteActivationKeyMutation(chrome?.auth?.getToken()));
};

export { useDeleteActivationKey as default };
