import { renderHook, waitFor } from '@testing-library/react';
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

    const { result } = renderHook(() => useActivationKeys(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(keyData);
  });
});
