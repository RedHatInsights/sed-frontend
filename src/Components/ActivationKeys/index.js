import React from 'react';
import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateIcon,
  Title,
} from '@patternfly/react-core';
import { LockIcon } from '@patternfly/react-icons';

const ActivationKeys = () => (
  <Bullseye>
    <EmptyState>
      <EmptyStateIcon icon={LockIcon} />
      <Title headingLevel="h4" size="lg">
        This feature is not currently supported
      </Title>
      <Button
        component="a"
        variant="link"
        href="https://access.redhat.com/articles/simple-content-access"
        target="_blank"
        rel="noreferrer noopener"
      >
        Customer portal
      </Button>
    </EmptyState>
  </Bullseye>
);

export default ActivationKeys;
