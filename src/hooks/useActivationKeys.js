import { useQuery, QueryObserverResult } from 'react-query';

const fetchActivationKeysData = async () => {
  const token = await window.insights.chrome.auth.getToken();

  const response = await fetch('/api/rhsm/v2/activation_keys', {
    headers: { Authorization: `Bearer ${token}` },
  });

  const activationKeysData = await response.json();

  return activationKeysData.body;
};

const getActivationKeys = async () => {
  const keysData = await fetchActivationKeysData();
  return keysData;
};

const useActivationKeys = () => {
  return useQuery('activation_keys', () => getActivationKeys());
};

export { useActivationKeys as default };
