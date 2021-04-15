import {
  GET_CONNECTED_HOSTS,
  GET_CURR_STATE,
  GET_LOG,
  SET_CURR_STATE,
} from './actionTypes';

describe('actionTypes', () => {
  test('defined', () => {
    expect(GET_CONNECTED_HOSTS).toBe('GET_CONNECTED_HOSTS');
    expect(GET_CURR_STATE).toBe('GET_CURR_STATE');
    expect(GET_LOG).toBe('GET_LOG');
    expect(SET_CURR_STATE).toBe('SET_CURR_STATE');
  });
});
