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
        payload: {
          compliance: false,
          remediations: false,
          insights: false,
        },
      })
    ).toMatchObject({
      loaded: true,
      values: {
        compliance: false,
        remediations: false,
        insights: false,
      },
    });
  });

  test('should spread payload', () => {
    expect(
      reducer(undefined, {
        type: `${GET_CURR_STATE}_FULFILLED`,
        payload: {
          compliance: false,
          remediations: false,
          insights: true,
          active: true,
        },
      })
    ).toMatchObject({
      loaded: true,
      values: {
        compliance: false,
        remediations: false,
        insights: true,
        active: true,
      },
    });
  });
});
