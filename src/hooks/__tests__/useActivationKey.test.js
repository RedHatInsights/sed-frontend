import { renderHook, waitFor } from '@testing-library/react';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { createQueryWrapper } from '../../utils/testHelpers';
import useActivationKey from '../useActivationKey';

enableFetchMocks();

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

    const { result } = renderHook(() => useActivationKey('A'), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(keyData);
  });
});
