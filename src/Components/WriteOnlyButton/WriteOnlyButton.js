import { Button, Tooltip } from '@patternfly/react-core';
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
      {isDisabled && (
        <Tooltip content={<div>Your tooltip content goes here</div>}>
          <span></span>
        </Tooltip>
      )}
    </Button>
  );
};

WriteOnlyButton.propTypes = {
  children: PropTypes.element.isRequired,
};

export default WriteOnlyButton;
