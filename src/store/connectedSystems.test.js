import { GET_CONNECTED_HOSTS } from './actionTypes';
import reducer from './connectedSystems';

describe('connectedSystems', () => {
  test('should set error', () => {
    expect(
      reducer(undefined, {
        type: `${GET_CONNECTED_HOSTS}_ERROR`,
      })
    ).toMatchObject({
      error: true,
    });
  });
  test('should set loading', () => {
    expect(
      reducer(undefined, {
        type: `${GET_CONNECTED_HOSTS}_PENDING`,
      })
    ).toMatchObject({
      loaded: false,
    });
  });

  test('should not crash without payload', () => {
    expect(
      reducer(undefined, {
        type: `${GET_CONNECTED_HOSTS}_FULFILLED`,
      })
    ).toMatchObject({
      loaded: true,
      hosts: [],
      total: 0,
      page: 0,
      perPage: 0,
    });
  });

  test('should spread payload', () => {
    expect(
      reducer(undefined, {
        type: `${GET_CONNECTED_HOSTS}_FULFILLED`,
        payload: {
          results: ['one'],
          count: 10,
          page: 1,
          per_page: 10,
        },
      })
    ).toMatchObject({
      loaded: true,
      hosts: ['one'],
      total: 10,
      page: 1,
      perPage: 10,
    });
  });
});
