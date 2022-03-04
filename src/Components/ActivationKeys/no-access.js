import {
  Bullseye,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from '@patternfly/react-core';
import { LockIcon } from '@patternfly/react-icons';
import React from 'react';

const NoAccessView = () => (
  <Bullseye>
    <EmptyState>
      <EmptyStateIcon icon={LockIcon} />
      <Title headingLevel="h4" size="lg">
        Activation keys can only be accessed by organization administrators.
      </Title>
      <EmptyStateBody>
        If you already know your organization ID and activation key, you can
        register systems with RHC.
      </EmptyStateBody>
    </EmptyState>
  </Bullseye>
);

export default NoAccessView;
