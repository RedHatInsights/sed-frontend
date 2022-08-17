import {
  fetchConnectedHosts,
  fetchCurrState,
  saveCurrState,
  fetchLog,
} from './actions';
import { configApi } from '../api';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(configApi.axios);

describe('actions', () => {
  beforeEach(() => {
    mock.reset();
  });

  test('fetchCurrState', async () => {
    mock.onGet('/api/config-manager/v1/states/current').reply(200, {});
    const action = fetchCurrState();
    await action.payload;
    expect(action.type).toBe('GET_CURR_STATE');
  });

  test('saveCurrState', async () => {
    mock.onPost('/api/config-manager/v1/states').reply(200, {});
    mock.onPost('/api/config-manager/v1/manage').reply(200, {});
    const action = saveCurrState({});
    await action.payload;
    expect(action.type).toBe('SET_CURR_STATE');
  });

  describe('fetchLog', () => {
    test('no pagination', async () => {
      mock
        .onGet('/api/config-manager/v1/states?limit=50&offset=0')
        .reply(200, {});
      const action = fetchLog();
      await action.payload;
      expect(action.type).toBe('GET_LOG');
    });

    test('just page', async () => {
      mock
        .onGet('/api/config-manager/v1/states?limit=50&offset=50')
        .reply(200, {});
      const action = fetchLog({ page: 2 });
      await action.payload;
      expect(action.type).toBe('GET_LOG');
    });

    test('just per page', async () => {
      mock
        .onGet('/api/config-manager/v1/states?limit=22&offset=0')
        .reply(200, {});
      const action = fetchLog({ perPage: 22 });
      await action.payload;
      expect(action.type).toBe('GET_LOG');
    });

    test('full pagination', async () => {
      mock
        .onGet('/api/config-manager/v1/states?limit=22&offset=44')
        .reply(200, {});
      const action = fetchLog({ perPage: 22, page: 3 });
      await action.payload;
      expect(action.type).toBe('GET_LOG');
    });
  });

  test('fetchConnectedHosts', async () => {
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
