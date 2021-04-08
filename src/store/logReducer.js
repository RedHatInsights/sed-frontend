import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { GET_LOG } from './actionTypes';

const initialState = {
  loaded: false,
  results: [],
};

const logPending = (state) => ({
  ...state,
  loaded: false,
});
const logFulfilled = (state, { payload }) => ({
  ...state,
  loaded: true,
  results: payload,
});

export default applyReducerHash(
  {
    [`${GET_LOG}_PENDING`]: logPending,
    [`${GET_LOG}_FULFILLED`]: logFulfilled,
    [`${GET_LOG}_ERROR`]: () => ({ error: true }),
  },
  initialState
);
