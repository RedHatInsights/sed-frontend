import { useQuery } from 'react-query';

const fetchActivationKeyData = async (keyName) => {
  if (!keyName) {
    return false;
  }
  const token = await window.insights.chrome.auth.getToken();

  const response = await fetch(`/api/rhsm/v2/activation_keys/${keyName}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const activationKeysData = await response.json();

  return activationKeysData.body;
};

const getActivationKey = async (keyName) => {
  const keysData = await fetchActivationKeyData(keyName);
  return keysData;
};

const useActivationKey = (keyName) => {
  return useQuery(`activation_key_${keyName}`, () => getActivationKey(keyName));
};

export { useActivationKey as default };
