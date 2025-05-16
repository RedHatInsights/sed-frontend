import { useConfigApi, useInventoryApi } from '../api';
import {
  GET_CURR_STATE,
  SET_CURR_STATE,
  GET_CONNECTED_HOSTS,
} from './actionTypes';

const fetchCurrState = (api) => () => ({
  type: GET_CURR_STATE,
  payload: api.getProfile('current'),
});

const saveCurrState =
  (api) =>
  ({ remediations }) => ({
    type: SET_CURR_STATE,
    payload: api.createProfile({
      active: true,
      compliance: true,
      insights: true,
      remediations,
    }),
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
    saveCurrState: saveCurrState(api),
    fetchCurrState: fetchCurrState(api),
  };
};
