import { Button } from '@patternfly/react-core';
import React from 'react';
import { useQueryClient } from 'react-query';
import PropTypes from 'prop-types';

const WriteOnlyButton = (props) => {
  const { children, ...buttonProps } = props;

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const isDisabled = !user.rbacPermissions.canWriteActivationKeys;

  return (
    <Button isDisabled={isDisabled} {...buttonProps}>
      {children}
    </Button>
  );
};

WriteOnlyButton.propTypes = {
  children: PropTypes.element.isRequired,
};

export default WriteOnlyButton;
