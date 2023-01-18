import React from 'react';
import { useQueryClient } from 'react-query';
import { Button } from '@patternfly/react-core';
import PropTypes from 'prop-types';

const EditAdditionalRepositoriesButton = (props) => {
  const { onClick } = props;
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const isDisabled = () => {
    return !user.rbacPermissions.canWriteActivationKeys;
  };
  return (
    <React.Fragment>
      <Button
        onClick={onClick}
        isDisabled={isDisabled()}
        variant="secondary"
        style={{ margin: 15, marginLeft: 0 }}
      >
        Edit additional repositories
      </Button>
    </React.Fragment>
  );
};

EditAdditionalRepositoriesButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditAdditionalRepositoriesButton;
