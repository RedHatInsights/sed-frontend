import React from 'react';
import PropTypes from 'prop-types';
import { WriteOnlyButton } from '../WriteOnlyButton';

const DeleteButton = ({ onClick }) => {
  return (
    <React.Fragment>
      <WriteOnlyButton onClick={onClick} variant="secondary">
        Delete
      </WriteOnlyButton>
    </React.Fragment>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
