import { configApi, updateCurrState } from '../api';
import { GET_CURR_STATE, GET_LOG, SET_CURR_STATE } from './actionTypes';

export const fetchCurrState = () => ({
  type: GET_CURR_STATE,
  payload: configApi.getCurrentState(),
});

export const saveCurrState = (data) => ({
  type: SET_CURR_STATE,
  payload: updateCurrState(data),
});

export const fetchLog = () => ({
  type: GET_LOG,
  payload: configApi.getStates(),
});
