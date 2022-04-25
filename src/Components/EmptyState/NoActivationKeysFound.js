import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { AddCircleOIcon } from '@patternfly/react-icons';
import CreateActivationKeyButton from '../ActivationKeys/CreateActivationKeyButton';

const NoActivationKeysFound = (props) => {
  const { handleModalToggle } = props;
  return (
    <>
      <EmptyState>
        <EmptyStateIcon icon={AddCircleOIcon} />
        <Title headingLevel="h5" size="lg">
          No activation keys
        </Title>
        <EmptyStateBody>
          You currently have no activation keys to display. Activation keys
          allow you to register a system with system purpose, role and usage
          attached.
        </EmptyStateBody>
        <CreateActivationKeyButton onClick={handleModalToggle} />
      </EmptyState>
    </>
  );
};

NoActivationKeysFound.propTypes = {
  handleModalToggle: PropTypes.func.isRequired,
};

export default NoActivationKeysFound;
