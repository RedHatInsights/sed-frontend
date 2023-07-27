import React from 'react';
import PropTypes from 'prop-types';
import { WriteOnlyButton } from '../WriteOnlyButton';
import { TrashIcon } from '@patternfly/react-icons';

const DeleteActivationKeyButton = ({ onClick }) => {
  return (
    <WriteOnlyButton
      variant="plain"
      onClick={onClick}
      disabledTooltip="For editing access, contact your administrator."
      enabledTooltip="Delete"
    >
      <TrashIcon />
    </WriteOnlyButton>
  );
};

DeleteActivationKeyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteActivationKeyButton;
