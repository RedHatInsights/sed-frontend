import { renderHook } from '@testing-library/react-hooks';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { createQueryWrapper } from '../../utils/testHelpers';
import useUpdateActivationKey from '../useUpdateActivationKey';
import TestRenderer from 'react-test-renderer';

enableFetchMocks();

describe('useUpdateActivationKey', () => {
  const { act } = TestRenderer;
  beforeEach(() => {
    Object.defineProperty(window, 'insights', {
      value: {
        chrome: {
          auth: {
            getToken: jest.fn(),
          },
        },
      },
    });
  });
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
