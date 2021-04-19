import { Title } from '@patternfly/react-core';
import React from 'react';
import ActivationKeysTable from './activation-keys-table';
import NoAccessView from './no-access';

function ActivationKeys() {
  return (
    <div>
      <Title size="2xl" headingLevel="h1">
        Following content will be in a separate tab. Data is mocked, we
        don&#39;t know the API endpoint yet.
      </Title>
      {/** This will be visible to org admins */}
      <ActivationKeysTable />
      {/* This will be visible only to non org admins */}
      <NoAccessView />
    </div>
  );
}

export default ActivationKeys;
