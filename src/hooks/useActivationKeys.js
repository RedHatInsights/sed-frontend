import { useQuery } from '@tanstack/react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const fetchActivationKeysData = (token) => async () => {
  const response = await fetch('/api/rhsm/v2/activation_keys', {
    headers: { Authorization: `Bearer ${await token}` },
  });

  const activationKeysData = await response.json();

  return activationKeysData.body;
};

const getActivationKeys = (token) => async () => {
  const keysData = await fetchActivationKeysData(token)();
  return keysData;
};

const useActivationKeys = () => {
  const chrome = useChrome();

  return useQuery(
    ['activation_keys'],
    getActivationKeys(chrome?.auth?.getToken())
  );
};

export { useActivationKeys as default };
