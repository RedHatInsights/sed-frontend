import { configApi, updateCurrState, getConnectedHosts } from '../api';
import {
  GET_CURR_STATE,
  GET_LOG,
  SET_CURR_STATE,
  GET_CONNECTED_HOSTS,
} from './actionTypes';

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

export const fetchConnectedHosts = () => ({
  type: GET_CONNECTED_HOSTS,
  payload: getConnectedHosts(),
});
