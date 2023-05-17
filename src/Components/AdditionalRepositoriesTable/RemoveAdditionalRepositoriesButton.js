import React from 'react';
import PropTypes from 'prop-types';
import { WriteOnlyButton } from '../WriteOnlyButton';
import { MinusCircleIcon } from '@patternfly/react-icons';
import { Tooltip } from '@patternfly/react-core';

const RemoveAdditionalRepositoriesButton = ({ onClick }) => {
  return (
    <React.Fragment>
      <Tooltip content={<div>Remove</div>}>
        <WriteOnlyButton onClick={onClick} variant="plain" aria-label="Action">
          <MinusCircleIcon />
        </WriteOnlyButton>
      </Tooltip>
    </React.Fragment>
  );
};

RemoveAdditionalRepositoriesButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RemoveAdditionalRepositoriesButton;
