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
        return await defaultGetEntities(undefined, config, tags);
      }}
      onRowClick={(_e, id) =>
        (window.location.href = `./insights/inventory/${id}`)
      }
      customFilters={{
        filters: [
          {
            rhcdFilter: ['not_nil'],
          },
        ],
      }}
      onLoad={({ mergeWithEntities }) => {
        register?.({
          ...mergeWithEntities(),
        });
      }}
      showCentosVersions
    />
  );
};

export default SystemsTable;
