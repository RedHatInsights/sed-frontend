import React from 'react';
import { InventoryTable } from '@redhat-cloud-services/frontend-components/Inventory';
import { register } from '../../store';

const SystemsTable = () => {
  return (
    <InventoryTable
      variant="compact"
      showTags
      hasCheckbox={false}
      columns={(defaultColumns) => defaultColumns}
      getEntities={async (_i, config, tags, defaultGetEntities) => {
        const { rhcdFilter = [] } = config?.filters || {};

        //overrides the rhcd from Inventory module if that filter does not exist
        config.filter = {
          system_profile: {
            rhc_client_id: rhcdFilter.length !== 0 ? rhcdFilter : 'not_nil',
          },
        };

        const data = await defaultGetEntities(undefined, config, tags);
        return data;
      }}
      onRowClick={(_e, id) =>
        (window.location.href = `./insights/inventory/${id}`)
      }
      onLoad={({ mergeWithEntities }) => {
        register?.({
          ...mergeWithEntities(),
        });
      }}
    />
  );
};

export default SystemsTable;
