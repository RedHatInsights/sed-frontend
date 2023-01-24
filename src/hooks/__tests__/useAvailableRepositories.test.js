import { renderHook } from '@testing-library/react-hooks';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { createQueryWrapper } from '../../utils/testHelpers';
import useAvailableRepositories from '../useAvailableRepositories';

enableFetchMocks();

describe('useAvailableRepositories', () => {
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
  it('returns available repositories from the API', async () => {
    const keyName = [
      {
        name: 'A',
        role: 'role',
        sla: 'sla',
        usage: 'usage',
      },
    ];

    fetch.mockResponseOnce(JSON.stringify({ body: [...keyName] }));

    const { result, waitFor } = renderHook(
      () => useAvailableRepositories('A'),
      {
        wrapper: createQueryWrapper(),
      }
    );

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual(keyName);
  });
});
