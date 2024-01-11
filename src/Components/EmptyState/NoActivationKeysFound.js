import React from 'react';
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon, EmptyStateHeader, EmptyStateFooter,
  } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { AddCircleOIcon } from '@patternfly/react-icons';
import CreateActivationKeyButton from '../ActivationKeys/CreateActivationKeyButton';

const NoActivationKeysFound = (props) => {
  const { handleModalToggle } = props;
  return (
    <>
      <EmptyState>
        <EmptyStateHeader titleText="No activation keys" icon={<EmptyStateIcon icon={AddCircleOIcon} />} headingLevel="h5" />
        <EmptyStateBody>
          You currently have no activation keys to display. Activation keys
          allow you to register a system with system purpose, role and usage
          attached.
        </EmptyStateBody><EmptyStateFooter>
        <CreateActivationKeyButton onClick={handleModalToggle} />
      </EmptyStateFooter></EmptyState>
    </>
  );
};

NoActivationKeysFound.propTypes = {
  handleModalToggle: PropTypes.func.isRequired,
};

export default NoActivationKeysFound;
