import { renderHook } from '@testing-library/react-hooks';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { createQueryWrapper } from '../../utils/testHelpers';
import useActivationKey from '../useActivationKey';

enableFetchMocks();
jest.mock(
  '@redhat-cloud-services/frontend-components/useChrome',
  // eslint-disable-next-line react/display-name
  () => jest.fn()
);

describe('useActivationKey', () => {
  it('returns activation key details from the API', async () => {
    const keyData = [
      {
        name: 'A',
        role: 'role',
        sla: 'sla',
        usage: 'usage',
      },
    ];

    fetch.mockResponseOnce(JSON.stringify({ body: [...keyData] }));

    const { result, waitFor } = renderHook(() => useActivationKey('A'), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(keyData);
  });
});
