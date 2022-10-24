import React, { useContext, useRef } from 'react';
import { InventoryTable } from '@redhat-cloud-services/frontend-components/Inventory';
import { RegistryContext } from '../../store';

const SystemsTable = () => {
  const getEntitiesRef = useRef(() => undefined);
  const { getRegistry } = useContext(RegistryContext);
  return (
    <InventoryTable
      variant="compact"
      showTags
      hasCheckbox={false}
      getEntities={async (_i, config) => {
        config.filter = {
          system_profile: {
            rhc_client_id: 'not_nil',
          },
        };
        const data = await getEntitiesRef.current(undefined, config, true);
        return data;
      }}
      onRowClick={(_e, id) =>
        (window.location.href = `./insights/inventory/${id}`)
      }
      onLoad={({ mergeWithEntities, api }) => {
        getEntitiesRef.current = api?.getEntities;
        getRegistry()?.register?.({
          ...mergeWithEntities(),
        });
      }}
    />
  );
};

export default SystemsTable;
