import { useMutation, useQueryClient } from 'react-query';

const activationKeyMutation = async (data) => {
  const { name, role, serviceLevel, usage } = data;
  const token = await window.insights.chrome.auth.getToken();
  const response = await fetch('/api/rhsm/v2/activation_keys', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      role: role,
      serviceLevel: serviceLevel,
      usage: usage,
    }),
  });
  if (!response.ok) {
    throw new Error(
      `Status Code ${response.status}.  Error creating activation key: ${response.statusText}.`
    );
  }
  return response.json();
};

const useCreateActivationKey = () => {
  const queryClient = useQueryClient();
  return useMutation(activationKeyMutation, {
    onSuccess: () => {
      queryClient.resetQueries('activation_keys');
    },
    onError: () => {
      console.log('error hook');
    },
  });
};

export { useCreateActivationKey as default };
