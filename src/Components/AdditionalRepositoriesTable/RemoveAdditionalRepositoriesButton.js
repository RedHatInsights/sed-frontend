import React from 'react';
import PropTypes from 'prop-types';
import { WriteOnlyButton } from '../WriteOnlyButton';
import { MinusCircleIcon } from '@patternfly/react-icons';
import { usePermissionsWithContext } from '@redhat-cloud-services/frontend-components-utilities/RBACHook';

const RemoveAdditionalRepositoriesButton = ({ onClick }) => {
  const { hasAccess: canWriteActivationKeys } = usePermissionsWithContext([
    'config-manager:activation_keys:write',
  ]);

  return (
    <WriteOnlyButton
      onClick={onClick}
      enabledTooltip="Remove"
      disabledTooltip="For editing access, contact your administrator."
      variant="plain"
      aria-label="Action"
      disabled={!canWriteActivationKeys}
      icon={<MinusCircleIcon />}
    />
  );
};

RemoveAdditionalRepositoriesButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RemoveAdditionalRepositoriesButton;
