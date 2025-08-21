import React from 'react';
import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateBody,
  Spinner,
  EmptyStateActions,
  EmptyStateFooter,
} from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';
import useInsightsNavigate from '@redhat-cloud-services/frontend-components-utilities/useInsightsNavigate/useInsightsNavigate';
import PropTypes from 'prop-types';

const SuccessPage = ({ isLoading, name, onClose }) => {
  const navigate = useInsightsNavigate();

  const content = isLoading ? (
    <Spinner />
  ) : (
    <EmptyState
      headingLevel="h4"
      icon={CheckCircleIcon}
      titleText="Activation key created"
    >
      <EmptyStateBody>
        <b>{name}</b> is now available for use. Click <b>View activation key</b>{' '}
        to edit settings or add repositories.
      </EmptyStateBody>
      <EmptyStateFooter>
        <Button
          variant="primary"
          onClick={() => navigate(`/activation-keys/${name}`)}
        >
          View activation key
        </Button>
        <EmptyStateActions>
          <Button variant="link" onClick={onClose}>
            Close
          </Button>
        </EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );

  return <Bullseye>{content}</Bullseye>;
};

SuccessPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SuccessPage;
