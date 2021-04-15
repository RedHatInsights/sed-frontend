import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { GET_CONNECTED_HOSTS } from './actionTypes';

const initialState = {
  loaded: false,
  values: {},
};

const connectedSystemsPending = (state) => ({
  ...state,
  loaded: false,
});

const connectedSystemsFulfilled = (state, { payload }) => ({
  ...state,
  loaded: true,
  hosts: payload?.results,
  total: payload?.count,
  page: payload?.page,
  perPage: payload?.per_page,
});

export default applyReducerHash(
  {
    [`${GET_CONNECTED_HOSTS}_PENDING`]: connectedSystemsPending,
    [`${GET_CONNECTED_HOSTS}_FULFILLED`]: connectedSystemsFulfilled,
    [`${GET_CONNECTED_HOSTS}_ERROR`]: () => ({ error: true }),
  },
  initialState
);
