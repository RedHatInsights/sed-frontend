import { renderHook } from '@testing-library/react-hooks';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { createQueryWrapper } from '../../utils/testHelpers';
import useCreateActivationKey from '../useCreateActivationKey';
import TestRenderer from 'react-test-renderer';

enableFetchMocks();

describe('useActivationKeys', () => {
  const { act } = TestRenderer;
  it('creates activation key', async () => {
    fetch.mockResponseOnce(JSON.stringify({ body: { id: 'id' } }));
    const keyParams = {
      name: 'A',
      role: 'role',
      serviceLevel: 'sla',
      usage: 'usage',
    };
    const { result } = renderHook(() => useCreateActivationKey(), {
      wrapper: createQueryWrapper(),
    });
    await act(async () => {
      result.current.mutate(keyParams);
    });
    expect(fetch).toHaveBeenCalled();
  });
});
