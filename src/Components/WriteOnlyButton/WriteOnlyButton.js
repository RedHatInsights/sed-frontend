import { Button } from '@patternfly/react-core';
import React from 'react';
import PropTypes from 'prop-types';
import NoAccessPopover from '../NoAccessPopover';
import { Tooltip } from '@patternfly/react-core';
import { usePermissionsWithContext } from '@redhat-cloud-services/frontend-components-utilities/RBACHook';

const WriteOnlyButton = (props) => {
  const {
    children,
    enabledTooltip,
    disabledTooltip = 'Disabled',
    ...buttonProps
  } = props;

  const { hasAccess: canWriteActivationKeys } = usePermissionsWithContext([
    'config-manager:activation_keys:write',
  ]);

  const showEnabledTooltip = enabledTooltip && canWriteActivationKeys;

  return (
    <>
      {!canWriteActivationKeys ? (
        <NoAccessPopover
          content={() => (
            <Tooltip
              position="top"
              content={disabledTooltip}
              trigger="mouseenter"
            >
              <Button {...buttonProps} isDisabled>
                {children}
              </Button>
            </Tooltip>
          )}
        />
      ) : (
        <>
          {showEnabledTooltip && (
            <Tooltip
              position="top"
              content={enabledTooltip}
              trigger="mouseenter"
            >
              <Button {...buttonProps}>{children}</Button>
            </Tooltip>
          )}
          {!showEnabledTooltip && <Button {...buttonProps}>{children}</Button>}
        </>
      )}
    </>
  );
};

WriteOnlyButton.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  enabledTooltip: PropTypes.string,
  disabledTooltip: PropTypes.string,
};

export default WriteOnlyButton;
