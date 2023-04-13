import { renderHook } from '@testing-library/react-hooks';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { createQueryWrapper } from '../../utils/testHelpers';
import useActivationKeys from '../useActivationKeys';

enableFetchMocks();

describe('useActivationKeys', () => {
  it('returns activation keys from the API', async () => {
    const keyData = [
      {
        name: 'A',
        role: 'role',
        sla: 'sla',
        usage: 'usage',
      },
    ];

    fetch.mockResponseOnce(JSON.stringify({ body: [...keyData] }));

    const { result, waitFor } = renderHook(() => useActivationKeys(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(keyData);
  });
});
