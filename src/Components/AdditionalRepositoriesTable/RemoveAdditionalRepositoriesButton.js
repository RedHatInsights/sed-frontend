import React from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from '@tanstack/react-query';
import { WriteOnlyButton } from '../WriteOnlyButton';
import { MinusCircleIcon } from '@patternfly/react-icons';

const RemoveAdditionalRepositoriesButton = ({ onClick }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);
  const isButtonEnabled = user?.rbacPermissions.canWriteActivationKeys || false;

  return (
    <WriteOnlyButton
      onClick={onClick}
      enabledTooltip="Remove"
      disabledTooltip="For editing access, contact your administrator."
      variant="plain"
      aria-label="Action"
      disabled={!isButtonEnabled}
    >
      <MinusCircleIcon />
    </WriteOnlyButton>
  );
};

RemoveAdditionalRepositoriesButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RemoveAdditionalRepositoriesButton;
