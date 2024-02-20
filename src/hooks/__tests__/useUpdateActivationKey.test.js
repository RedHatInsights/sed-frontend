import { renderHook, act } from '@testing-library/react';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { createQueryWrapper } from '../../utils/testHelpers';
import useUpdateActivationKey from '../useUpdateActivationKey';

enableFetchMocks();

describe('useUpdateActivationKey', () => {
  it('updates activation key', async () => {
    fetch.mockResponseOnce(JSON.stringify({ body: { id: 'id' } }));
    const keyParams = {
      name: 'A',
      role: 'role',
      serviceLevel: 'sla',
      usage: 'usage',
    };
    const { result } = renderHook(() => useUpdateActivationKey(), {
      wrapper: createQueryWrapper(),
    });
    await act(async () => {
      result.current.mutate(keyParams);
    });
    expect(fetch).toHaveBeenCalled();
  });
});
