import { useQuery } from 'react-query';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

const fetchSystemPurposeAttributes = (token) => async () => {
  const response = await fetch(
    '/api/rhsm/v2/organization?include=system_purpose_attributes',
    {
      headers: { Authorization: `Bearer ${await token}` },
    }
  );

  const responseData = await response.json();

  return responseData.body;
};

const getSystemPurposeAttributes = (token) => async () => {
  const data = await fetchSystemPurposeAttributes(token)();
  return data.systemPurposeAttributes;
};

const useSystemPurposeAttributes = () => {
  const chrome = useChrome();

  return useQuery(
    'organization_system_purpose_attributes',
    getSystemPurposeAttributes(chrome?.auth?.getToken())
  );
};

export { useSystemPurposeAttributes as default };
