import React from 'react';
import { Button } from '@patternfly/react-core';
import { useQueryClient } from 'react-query';
import PropTypes from 'prop-types';

const CreateActivationKeyButton = (props) => {
  const { onClick } = props;
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const isDisabled = () => {
    return !user.rbacPermissions.canWriteActivationKeys;
  };
  return (
    <Button variant="primary" onClick={onClick} isDisabled={isDisabled()}>
      Create activation key
    </Button>
  );
};

CreateActivationKeyButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default CreateActivationKeyButton;
