import React from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { WriteOnlyButton } from '../WriteOnlyButton';
import { MinusCircleIcon } from '@patternfly/react-icons';
import { Tooltip } from '@patternfly/react-core';

const RemoveAdditionalRepositoriesButton = ({ onClick }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const isButtonEnabled = user?.rbacPermissions.canWriteActivationKeys || false;

  return (
    <>
      {isButtonEnabled ? (
        <Tooltip
          position="top"
          content={<div>Remove</div>}
          trigger="mouseenter"
        >
          <WriteOnlyButton
            onClick={onClick}
            variant="plain"
            aria-label="Action"
          >
            <MinusCircleIcon />
          </WriteOnlyButton>
        </Tooltip>
      ) : (
        <WriteOnlyButton onClick={onClick} variant="plain" aria-label="Action">
          <MinusCircleIcon />
        </WriteOnlyButton>
      )}
    </>
  );
};

RemoveAdditionalRepositoriesButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RemoveAdditionalRepositoriesButton;
