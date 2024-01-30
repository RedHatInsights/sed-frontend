import { useAuthenticateUser } from '../platformServices';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { renderHook, waitFor } from '@testing-library/react';
import { createQueryWrapper } from '../../utils/testHelpers';

jest.mock('@redhat-cloud-services/frontend-components/useChrome', () =>
  jest.fn()
);

describe('Authenticate User method', () => {
  it('should return a promise with user data', async () => {
    useChrome.mockImplementation(() => ({
      auth: {
        getUser: () =>
          Promise.resolve({
            identity: {
              account_number: 1,
              internal: {
                org_id: 1,
              },
            },
          }),
      },
    }));

    const { result } = renderHook(() => useAuthenticateUser(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual({
      identity: {
        account_number: 1,
        internal: {
          org_id: 1,
        },
      },
    });
  });

  it('should throw an error if rejected', async () => {
    useChrome.mockImplementation(() => ({
      auth: {
        getUser: () => Promise.reject(new Error('Error getting user')),
      },
    }));

    expect(() =>
      renderHook(() => useAuthenticateUser(), {
        wrapper: createQueryWrapper(),
      }).toThrow(Error('Error getting user'))
    );
  });
});
