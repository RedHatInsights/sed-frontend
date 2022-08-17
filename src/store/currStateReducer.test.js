import { SET_CURR_STATE, GET_CURR_STATE } from './actionTypes';
import reducer from './currStateReducer';

describe('currStateReducer', () => {
  test('should set error', () => {
    expect(
      reducer(undefined, {
        type: `${GET_CURR_STATE}_ERROR`,
      })
    ).toMatchObject({
      error: true,
    });
  });

  test('should set loading - SET_CURR_STATE', () => {
    expect(
      reducer(undefined, {
        type: `${SET_CURR_STATE}_PENDING`,
      })
    ).toMatchObject({
      loaded: false,
    });
  });

  test('should set loading - GET_CURR_STATE', () => {
    expect(
      reducer(undefined, {
        type: `${GET_CURR_STATE}_PENDING`,
      })
    ).toMatchObject({
      loaded: false,
    });
  });

  test('should not crash without payload', () => {
    expect(
      reducer(undefined, {
        type: `${GET_CURR_STATE}_FULFILLED`,
      })
    ).toMatchObject({
      loaded: true,
      values: {
        useOpenSCAP: false,
        enableCloudConnector: false,
        hasInsights: false,
      },
    });
  });

  test('should spread payload', () => {
    expect(
      reducer(undefined, {
        type: `${GET_CURR_STATE}_FULFILLED`,
        payload: {
          state: {
            insights: 'enabled',
          },
          apply_state: true,
        },
      })
    ).toMatchObject({
      loaded: true,
      values: {
        useOpenSCAP: false,
        enableCloudConnector: false,
        hasInsights: true,
        apply_state: true,
      },
    });
  });
});
