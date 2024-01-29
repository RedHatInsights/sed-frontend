import { useAuthenticateUser } from '../platformServices';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { renderHook, waitFor } from '@testing-library/react';
import { createQueryWrapper } from '../../utils/testHelpers';

jest.mock('@redhat-cloud-services/frontend-components/useChrome', () =>
  jest.fn()
);

beforeEach(() => {
  useChrome.mockImplementation(() => ({
    auth: {
      getUser: () => {},
    },
  }));
});

describe('Authenticate User method', () => {
  it('should return a promise with user data', async () => {
    useChrome.mockImplementation(() => ({
      auth: {
        getUser: () => ({
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

    await waitFor(() => result.current.isSuccess);

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
        getUser: () => {
          throw new Error('Error getting user');
        },
      },
    }));

    const { result } = renderHook(() => useAuthenticateUser(), {
      wrapper: createQueryWrapper(),
    });

    await waitFor(() => result.current.isError);

    // all undefined except for result
    console.log("&&&&&&&&&&");
    console.log(result.status, "result.status");
    console.log(result.isLoading, "result.isLoading");
    console.log(result.isError, "result.isError");
    console.log(result.error, "result.error");
    console.log(result, "result");

    expect(result.current.error.message).toEqual(
      'Error authenticating user: Error getting user'
    );
  });
});
