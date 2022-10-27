import React from 'react';
import { useQueryClient } from 'react-query';
import { Button } from '@patternfly/react-core';
import PropTypes from 'prop-types';

const DeleteButton = (props) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const isDisabled = () => {
    return !user.rbacPermissions.canWriteActivationKeys;
  };
  const { onClick } = props;
  return (
    <React.Fragment>
      <Button onClick={onClick} isDisabled={isDisabled()} variant="secondary">
        Delete
      </Button>
    </React.Fragment>
  );
};

DeleteButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default DeleteButton;
