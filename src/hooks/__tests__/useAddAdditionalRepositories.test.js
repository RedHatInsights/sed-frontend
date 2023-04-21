import { renderHook } from '@testing-library/react-hooks';
import fetch, { enableFetchMocks } from 'jest-fetch-mock';
import { createQueryWrapper } from '../../utils/testHelpers';
import useAddAdditionalRepositories from '../useAddAdditionalRepositories';
import TestRenderer from 'react-test-renderer';

enableFetchMocks();

describe('useAddAdditionalRepositories', () => {
  const { act } = TestRenderer;
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

    const { result, waitFor } = renderHook(
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
