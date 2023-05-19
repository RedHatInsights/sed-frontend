import { Button } from '@patternfly/react-core';
import React from 'react';
import { useQueryClient } from 'react-query';
import PropTypes from 'prop-types';
import NoAccessPopover from '../NoAccessPopover';

const WriteOnlyButton = (props) => {
  const { children, ...buttonProps } = props;

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const isDisabled = !user.rbacPermissions.canWriteActivationKeys;

  return (
    <>
      {isDisabled ? (
        <NoAccessPopover
          content={() => (
            <Button {...buttonProps} isDisabled>
              {children}
            </Button>
          )}
        />
      ) : (
        <Button {...buttonProps}>{children}</Button>
      )}
    </>
  );
};

WriteOnlyButton.propTypes = {
  children: PropTypes.element.isRequired,
};

export default WriteOnlyButton;
