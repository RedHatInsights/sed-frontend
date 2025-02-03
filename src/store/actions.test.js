import { renderHook } from '@testing-library/react';
import { useActions } from './actions';

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
const mock = new MockAdapter(axios);

jest.mock(
  '@redhat-cloud-services/frontend-components-utilities/interceptors',
  () => ({
    __esModule: true,
    useAxiosWithPlatformInterceptors: () => require('axios'),
  })
);

describe('actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('fetchCurrState', async () => {
    const {
      result: {
        current: { fetchCurrState },
      },
    } = renderHook(() => useActions());

    mock.onGet('/api/config-manager/v2/profiles/current').reply(200, {
      payload: {
        compliance: false,
        insights: true,
        remediations: false,
      },
    });
    const action = fetchCurrState();
    await action.payload;
    expect(action.type).toBe('GET_CURR_STATE');
  });

  test('saveCurrState', async () => {
    const {
      result: {
        current: { saveCurrState },
      },
    } = renderHook(() => useActions());

    mock.onPost('/api/config-manager/v2/profiles').reply(200, {});
    const action = saveCurrState({});
    await action.payload;
    expect(action.type).toBe('SET_CURR_STATE');
  });
});
