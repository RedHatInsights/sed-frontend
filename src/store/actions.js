import { configApi, updateCurrState, getConnectedHosts } from '../api';
import {
  GET_CURR_STATE,
  GET_LOG,
  SET_CURR_STATE,
  GET_CONNECTED_HOSTS,
} from './actionTypes';

export const fetchCurrState = () => ({
  type: GET_CURR_STATE,
  payload: configApi.getProfile('current'),
});

export const saveCurrState = (data) => ({
  type: SET_CURR_STATE,
  payload: updateCurrState(data),
});

export const fetchLog = ({ perPage = 50, page = 1 } = {}) => ({
  type: GET_LOG,
  payload: configApi.getProfiles(perPage, (page - 1) * perPage),
});

export const fetchConnectedHosts = () => ({
  type: GET_CONNECTED_HOSTS,
  payload: getConnectedHosts(),
});
