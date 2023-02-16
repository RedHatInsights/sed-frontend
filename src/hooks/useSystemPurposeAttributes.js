import { useQuery } from 'react-query';
import { useChrome } from '@redhat-cloud-services/frontend-components/useChrome';

const fetchSystemPurposeAttributes = async () => {
  const chrome = useChrome();
  const token = await chrome.auth.getToken();

  const response = await fetch(
    '/api/rhsm/v2/organization?include=system_purpose_attributes',
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const responseData = await response.json();

  return responseData.body;
};

const getSystemPurposeAttributes = async () => {
  const data = await fetchSystemPurposeAttributes();
  return data.systemPurposeAttributes;
};

const useSystemPurposeAttributes = () => {
  return useQuery('organization_system_purpose_attributes', () =>
    getSystemPurposeAttributes()
  );
};

export { useSystemPurposeAttributes as default };
