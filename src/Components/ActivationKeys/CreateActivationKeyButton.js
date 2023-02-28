import React from 'react';
import PropTypes from 'prop-types';
import { WriteOnlyButton } from '../WriteOnlyButton';

const CreateActivationKeyButton = ({ onClick }) => {
  return (
    <WriteOnlyButton variant="primary" onClick={onClick}>
      Create activation key
    </WriteOnlyButton>
  );
};

CreateActivationKeyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateActivationKeyButton;
