import { renderHook } from '@testing-library/react-hooks';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { createQueryWrapper } from '../../utils/testHelpers';
import useActivationKey from '../useActivationKey';

enableFetchMocks();

describe('useActivationKey', () => {
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
