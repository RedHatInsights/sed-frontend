import React from 'react';
import PropTypes from 'prop-types';
import { WriteOnlyButton } from '../WriteOnlyButton';

const EditButton = ({ onClick }) => {
  return (
    <React.Fragment>
      <WriteOnlyButton onClick={onClick} variant="secondary">
        Edit
      </WriteOnlyButton>
    </React.Fragment>
  );
};

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
