import { useConfigApi, useInventoryApi } from '../api';
import {
  GET_CURR_STATE,
  GET_LOG,
  SET_CURR_STATE,
  GET_CONNECTED_HOSTS,
} from './actionTypes';

const fetchCurrState = (api) => () => ({
  type: GET_CURR_STATE,
  payload: api.getProfile('current'),
});

const saveCurrState =
  (api) =>
  ({ compliance, remediations, active }) => ({
    type: SET_CURR_STATE,
    payload: api.createProfile({
      compliance,
      insights: true,
      remediations,
      active,
    }),
  });

const fetchLog =
  (api) =>
  ({ sort = 'created_at:desc', perPage = 50, page = 1 } = {}) => ({
    type: GET_LOG,
    payload: api.getProfiles(sort, perPage, (page - 1) * perPage),
  });

const fetchConnectedHosts = (api) => () => ({
  type: GET_CONNECTED_HOSTS,
  payload: api.getConnectedHosts(),
});

export const useActions = () => {
  const api = useConfigApi();
  const inventoryApi = useInventoryApi();

  return {
    fetchConnectedHosts: fetchConnectedHosts(inventoryApi),
    fetchLog: fetchLog(api),
    saveCurrState: saveCurrState(api),
    fetchCurrState: fetchCurrState(api),
  };
};
