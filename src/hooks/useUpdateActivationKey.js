import { useMutation } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const activationKeyMutation = (token) => async (data) => {
  const { activationKeyName, role, serviceLevel, usage, releaseVersion } = data;

  const response = await fetch(
    `/api/rhsm/v2/activation_keys/${activationKeyName}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${await token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role,
        serviceLevel,
        usage,
        releaseVersion,
      }),
    }
  );
  if (!response.ok) {
    throw new Error(
      `Status Code ${response.status}.  Error updating activation key: ${response.statusText}.`
    );
  }
  return response.json();
};

const useUpdateActivationKey = () => {
  const chrome = useChrome();
  return useMutation(activationKeyMutation(chrome.auth.getToken()));
};

export { useUpdateActivationKey as default };
