import React from 'react';
import PropTypes from 'prop-types';
import { WriteOnlyButton } from '../WriteOnlyButton';
import { MinusCircleIcon } from '@patternfly/react-icons';
import { Tooltip } from '@patternfly/react-core';

const RemoveAdditionalRepositoriesButton = ({ onClick, isDisabled }) => {
  return (
    <React.Fragment>
      {!isDisabled ? (
        <Tooltip
          position="top"
          content={<div>Remove</div>}
          trigger="mouseenter"
        >
          <WriteOnlyButton
            onClick={onClick}
            variant="plain"
            aria-label="Action"
          >
            <MinusCircleIcon />
          </WriteOnlyButton>
        </Tooltip>
      ) : (
        <WriteOnlyButton onClick={onClick} variant="plain" aria-label="Action">
          <MinusCircleIcon />
        </WriteOnlyButton>
      )}
    </React.Fragment>
  );
};

RemoveAdditionalRepositoriesButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default RemoveAdditionalRepositoriesButton;
