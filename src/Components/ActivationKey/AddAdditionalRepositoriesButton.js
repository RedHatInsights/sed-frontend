import React from 'react';
import PropTypes from 'prop-types';
import { WriteOnlyButton } from '../WriteOnlyButton';

const AddAdditionalRepositoriesButton = ({ onClick }) => {
  return (
    <React.Fragment>
      <WriteOnlyButton
        onClick={onClick}
        variant="secondary"
        style={{ margin: 15, marginLeft: 0 }}
      >
        Add repositories
      </WriteOnlyButton>
    </React.Fragment>
  );
};

AddAdditionalRepositoriesButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddAdditionalRepositoriesButton;
