import { configApi, updateCurrState } from '../api';
import { GET_CURR_STATE, SET_CURR_STATE } from './actionTypes';

export const fetchCurrState = () => ({
  type: GET_CURR_STATE,
  payload: configApi.getCurrentState(),
});

export const saveCurrState = (data) => ({
  type: SET_CURR_STATE,
  payload: updateCurrState(data),
});
