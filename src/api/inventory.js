import instance from '@redhat-cloud-services/frontend-components-utilities/interceptors';
const INVENTORY_BASE = '/api/inventory/v1';

export const getConnectedHosts = () =>
  instance.get(
    `${INVENTORY_BASE}/hosts?filter[system_profile][rhc_client_id]=not_nil&fields[system_profile]=rhc_client_id,rhc_config_state&staleness=fresh&staleness=stale&&registered_with=insights`
  );
