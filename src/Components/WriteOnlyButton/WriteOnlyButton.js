import { Button } from '@patternfly/react-core';
import React from 'react';
import { useQueryClient } from 'react-query';

const WriteOnlyButton = ( props ) => {
  const { children, ...buttonProps } = props;

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const isDisabled = !user.rbacPermissions.canWriteActivationKeys;

  return <Button isDisabled={isDisabled} {...buttonProps}> {children} </Button>
}

export default WriteOnlyButton;
