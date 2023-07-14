import React from 'react';
import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Spinner,
  Title,
} from '@patternfly/react-core';
import { CheckCircleIcon } from '@patternfly/react-icons';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const SuccessPage = ({ isLoading, name, onClose }) => {
  const history = useHistory();

  const content = isLoading ? (
    <Spinner />
  ) : (
    <EmptyState>
      <EmptyStateIcon color="green" icon={CheckCircleIcon} />
      <Title headingLevel="h4">Activation key created</Title>
      <EmptyStateBody>
        <b>{name}</b> is now available for use. Click <b>View activation key</b>{' '}
        to edit settings or add repositories.
      </EmptyStateBody>
      <Button
        variant="primary"
        onClick={() => history.push(`/activation-keys/${name}`)}
      >
        View activation key
      </Button>
      <EmptyStateSecondaryActions>
        <Button variant="link" onClick={onClose}>
          Close
        </Button>
      </EmptyStateSecondaryActions>
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
