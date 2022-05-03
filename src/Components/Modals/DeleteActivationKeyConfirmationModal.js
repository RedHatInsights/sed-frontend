import * as React from 'react';
import {
  Button,
  Modal,
  ModalVariant,
  TextContent,
  Text,
  TextVariants,
} from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
import propTypes from 'prop-types';
import useDeleteActivationKey from '../../hooks/useDeleteActivationKey';
import useNotifications from '../../hooks/useNotifications';
import Loading from '../LoadingState/Loading';
import { useQueryClient } from 'react-query';

const DeleteActivationKeyConfirmationModal = (props) => {
  const { isOpen, handleModalToggle, name } = props;
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const { mutate, isLoading } = useDeleteActivationKey();
  const queryClient = useQueryClient();

  const deleteActivationKey = (name) => {
    mutate(name, {
      onSuccess: (data, name) => {
        queryClient.resetQueries('activation_keys');
        addSuccessNotification(`Activation Key ${name} deleted`);
        handleModalToggle();
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
          Activtivation Key?
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
  name: propTypes.string.isRequired,
};

export default DeleteActivationKeyConfirmationModal;
