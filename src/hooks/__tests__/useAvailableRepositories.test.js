import { useQuery } from 'react-query';
import useAvailableRepositories from '../useAvailableRepositories';

jest.mock('react-query');
describe('useAvailableRepositories', () => {
  const keyName = 'testKey';

  beforeEach(() => {
    useQuery.mockReset();
  });

  test('should fetch available repositories correctly', async () => {
    useQuery.mockReturnValueOnce({
      isLoading: false,
      data: [
        { repositoryId: 1, repositoryName: 'Repo 1' },
        { repositoryId: 2, repositoryName: 'Repo 2' },
      ],
    });

    const result = useAvailableRepositories(keyName);

    expect(result.isLoading).toBe(false);
    expect(result.data).toEqual([
      { repositoryId: 1, repositoryName: 'Repo 1' },
      { repositoryId: 2, repositoryName: 'Repo 2' },
    ]);
  });

  test('should handle error during fetch correctly', async () => {
    useQuery.mockReturnValueOnce({
      isLoading: false,
      error: new Error('Fetch failed'),
    });

    const result = useAvailableRepositories(keyName);

    expect(result.isLoading).toBe(false);
    expect(result.error).toEqual(new Error('Fetch failed'));
  });
});
