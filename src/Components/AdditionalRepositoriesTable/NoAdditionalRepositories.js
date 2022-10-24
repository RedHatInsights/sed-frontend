import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from '@patternfly/react-core';
import { AddCircleOIcon } from '@patternfly/react-icons';

const NoAdditionalRepositories = () => {
  return (
    <>
      <EmptyState>
        <EmptyStateIcon icon={AddCircleOIcon} />
        <Title headingLevel="h5" size="lg">
          No additional repositories
        </Title>
        <EmptyStateBody>
          You currently have no additional repositories to display.
        </EmptyStateBody>
      </EmptyState>
    </>
  );
};

export default NoAdditionalRepositories;
