import { useMutation } from 'react-query';
const deleteActivationKeyMutation = async (name) => {
  const token = await window.insights.chrome.auth.getToken();
  const response = await fetch(`/api/rhsm/v2/activation_keys/${name}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
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
  return useMutation(deleteActivationKeyMutation);
};

export { useDeleteActivationKey as default };
