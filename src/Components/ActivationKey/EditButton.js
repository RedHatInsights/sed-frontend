import React from 'react';
import { useQueryClient } from 'react-query';
import { Button } from '@patternfly/react-core';
import PropTypes from 'prop-types';

const EditButton = (props) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const isDisabled = () => {
    return !user.rbacPermissions.canWriteActivationKeys;
  };
  const { onClick } = props;
  return (
    <React.Fragment>
      <Button onClick={onClick} isDisabled={isDisabled()} variant="secondary">
        Edit
      </Button>
    </React.Fragment>
  );
};

EditButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default EditButton;
