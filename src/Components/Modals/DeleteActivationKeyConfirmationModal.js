import * as React from 'react';
import {
  Button,
  Modal,
  ModalVariant,
  TextContent,
  Text,
  TextVariants,
} from '@patternfly/react-core';
import ExclamationTriangleIcon from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import propTypes from 'prop-types';
import useDeleteActivationKey from '../../hooks/useDeleteActivationKey';
import useNotifications from '../../hooks/useNotifications';
import Loading from '../LoadingState/Loading';
import { useQueryClient } from '@tanstack/react-query';

const DeleteActivationKeyConfirmationModal = (props) => {
  const { isOpen, handleModalToggle, name } = props;
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const { mutate, isLoading } = useDeleteActivationKey();
  const queryClient = useQueryClient();

  const deleteActivationKey = (name) => {
    mutate(name, {
      onSuccess: (_data, name) => {
        queryClient.setQueryData(['activation_keys'], (oldData) =>
          oldData.filter((entry) => entry.name != name));
        addSuccessNotification(`Activation key ${name} deleted`);
        handleModalToggle(true);
      },
      onError: () => {
        addErrorNotification('Something went wrong. Please try again');
        handleModalToggle();
      },
    });
    mutate;
  };
  const actions = [
    <Button
      key="confirm"
      variant="danger"
      onClick={() => deleteActivationKey(name)}
      data-testid="delete-activation-key-confirmation-modal-confirm-button"
    >
      Delete
    </Button>,
    <Button key="cancel" variant="link" onClick={handleModalToggle}>
      Cancel
    </Button>,
  ];

  const title = (
    <>
      <TextContent>
        <Text component={TextVariants.h2}>
          <ExclamationTriangleIcon size="md" color="#F0AB00" /> Delete
          activation key?
        </Text>
      </TextContent>
    </>
  );
  const content = () => {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <TextContent>
          <Text component={TextVariants.p}>
            <b>{name}</b> will no longer be available for use. This operation
            cannot be undone.
          </Text>
        </TextContent>
      );
    }
  };

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={handleModalToggle}
      variant={ModalVariant.small}
      actions={actions}
    >
      {content()}
    </Modal>
  );
};

DeleteActivationKeyConfirmationModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleModalToggle: propTypes.func.isRequired,
  name: propTypes.string.Required,
};

export default DeleteActivationKeyConfirmationModal;
