import { GET_LOG } from './actionTypes';
import reducer from './logReducer';

describe('logReducer', () => {
  test('should set loading', () => {
    expect(
      reducer(undefined, {
        type: `${GET_LOG}_PENDING`,
      })
    ).toMatchObject({
      loaded: false,
    });
  });

  test('should not crash without payload', () => {
    expect(
      reducer(undefined, {
        type: `${GET_LOG}_FULFILLED`,
      })
    ).toMatchObject({
      loaded: true,
    });
  });

  test('should spread payload', () => {
    expect(
      reducer(undefined, {
        type: `${GET_LOG}_FULFILLED`,
        payload: {
          limit: 10,
        },
      })
    ).toMatchObject({
      loaded: true,
      limit: 10,
    });
  });
});
