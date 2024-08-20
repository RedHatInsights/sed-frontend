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

  describe('fetchLog', () => {
    test('no pagination', async () => {
      const {
        result: {
          current: { fetchLog },
        },
      } = renderHook(() => useActions());

      mock
        .onGet(
          '/api/config-manager/v2/profiles?sort_by=created_at%3Adesc&limit=50&offset=0'
        )
        .reply(200, {});
      const action = fetchLog();
      await action.payload;
      expect(action.type).toBe('GET_LOG');
    });

    test('just page', async () => {
      const {
        result: {
          current: { fetchLog },
        },
      } = renderHook(() => useActions());

      mock
        .onGet(
          '/api/config-manager/v2/profiles?sort_by=created_at%3Adesc&limit=50&offset=50'
        )
        .reply(200, {});
      const action = fetchLog({ page: 2 });
      await action.payload;
      expect(action.type).toBe('GET_LOG');
    });

    test('just per page', async () => {
      const {
        result: {
          current: { fetchLog },
        },
      } = renderHook(() => useActions());

      mock
        .onGet(
          '/api/config-manager/v2/profiles?sort_by=created_at%3Adesc&limit=22&offset=0'
        )
        .reply(200, {});
      const action = fetchLog({ perPage: 22 });
      await action.payload;
      expect(action.type).toBe('GET_LOG');
    });

    test('full pagination', async () => {
      const {
        result: {
          current: { fetchLog },
        },
      } = renderHook(() => useActions());

      mock
        .onGet(
          '/api/config-manager/v2/profiles?sort_by=created_at%3Adesc&limit=22&offset=44'
        )
        .reply(200, {});
      const action = fetchLog({ perPage: 22, page: 3 });
      await action.payload;
      expect(action.type).toBe('GET_LOG');
    });
  });

  test('fetchConnectedHosts', async () => {
    const {
      result: {
        current: { fetchConnectedHosts },
      },
    } = renderHook(() => useActions());

    mock
      .onGet(
        '/api/inventory/v1/hosts?filter[system_profile][rhc_client_id]=not_nil&fields[system_profile]=rhc_client_id,rhc_config_state&staleness=fresh&staleness=stale&&registered_with=insights'
      )
      .reply(200, {});
    const action = fetchConnectedHosts();
    await action.payload;
    expect(action.type).toBe('GET_CONNECTED_HOSTS');
  });
});
