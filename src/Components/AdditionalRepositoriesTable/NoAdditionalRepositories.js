import React from 'react';
import { EmptyState, EmptyStateBody } from '@patternfly/react-core';
import { AddCircleOIcon } from '@patternfly/react-icons';

const NoAdditionalRepositories = () => {
  return (
    <>
      <EmptyState
        headingLevel="h5"
        icon={AddCircleOIcon}
        titleText="No additional repositories"
      >
        <EmptyStateBody>
          You currently have no additional repositories to display.
        </EmptyStateBody>
      </EmptyState>
    </>
  );
};

export default NoAdditionalRepositories;
