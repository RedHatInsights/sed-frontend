import { useMutation } from 'react-query';

const activationKeyMutation = async (data) => {
  const { activationKeyName, role, serviceLevel, usage } = data;
  const token = await window.insights.chrome.auth.getToken();
  const response = await fetch(
    `/api/rhsm/v2/activation_keys/${activationKeyName}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: role,
        serviceLevel: serviceLevel,
        usage: usage,
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
  return useMutation(activationKeyMutation);
};

export { useUpdateActivationKey as default };
