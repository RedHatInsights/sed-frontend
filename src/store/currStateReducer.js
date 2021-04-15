import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { GET_CURR_STATE, SET_CURR_STATE } from './actionTypes';

const initialState = {
  loaded: false,
  values: {},
};

const currStatePending = (state) => ({
  ...state,
  loaded: false,
});
const currStateFulfilled = (state, { payload }) => ({
  ...state,
  loaded: true,
  values: {
    useOpenSCAP: payload?.state?.compliance_openscap === 'enabled',
    enableCloudConnector: payload?.state?.remediations === 'enabled',
    hasInsights: payload?.state?.insights === 'enabled',
  },
});

export default applyReducerHash(
  {
    [`${SET_CURR_STATE}_PENDING`]: currStatePending,
    [`${GET_CURR_STATE}_PENDING`]: currStatePending,
    [`${GET_CURR_STATE}_FULFILLED`]: currStateFulfilled,
    [`${SET_CURR_STATE}_FULFILLED`]: currStateFulfilled,
    [`${GET_CURR_STATE}_ERROR`]: () => ({ error: true }),
  },
  initialState
);
