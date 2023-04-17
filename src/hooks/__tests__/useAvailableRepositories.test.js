import { useQuery } from 'react-query';

import useAvailableRepositories from '../useAvailableRepositories';

jest.mock('react-query');
describe('useAvailableRepositories', () => {
  const keyName = 'testKey';

  beforeEach(() => {
    useQuery.mockReset();
  });
  describe('useAvailableRepositories', () => {
    test('should fetch available repositories correctly', async () => {
      const repositories = [];
      for (let i = 1; i <= 105; i++) {
        repositories.push({ repositoryId: i, repositoryName: `Repo ${i}` });
      }

      useQuery.mockReturnValueOnce({
        isLoading: false,
        data: repositories,
      });

      const result = useAvailableRepositories(keyName);

      expect(result.isLoading).toBe(false);
      expect(result.data).toEqual(repositories);
    });
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
