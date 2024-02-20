import { renderHook, waitFor, act } from '@testing-library/react';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { createQueryWrapper } from '../../utils/testHelpers';
import useAddAdditionalRepositories from '../useAddAdditionalRepositories';

enableFetchMocks();

describe('useAddAdditionalRepositories', () => {
  it('adds additional repository to activationKey', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ body: [{ repositoryLabel: 'repository-A' }] })
    );
    const keyParams = {
      selectedRepositories: [
        { repositoryLabel: 'repository-A', repositoryName: 'repository A' },
      ],
      keyName: 'A',
    };

    const { result } = renderHook(
      () => useAddAdditionalRepositories(keyParams.keyName),
      {
        wrapper: createQueryWrapper(),
      }
    );

    await act(async () => {
      result.current.mutate(keyParams);
    });

    await waitFor(() => result.current.isSuccess);

    expect(fetch).toHaveBeenCalled();
  });
});
