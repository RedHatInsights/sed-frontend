import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon, 
  EmptyStateHeader,
  } from '@patternfly/react-core';
import { AddCircleOIcon } from '@patternfly/react-icons';

const NoAdditionalRepositories = () => {
  return (
    <>
      <EmptyState>
        <EmptyStateHeader
          titleText="No additional repositories"
          icon={<EmptyStateIcon icon={AddCircleOIcon} />}
          headingLevel="h5"
        />
        <EmptyStateBody>
          You currently have no additional repositories to display.
        </EmptyStateBody>
      </EmptyState>
    </>
  );
};

export default NoAdditionalRepositories;
