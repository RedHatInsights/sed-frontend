import * as React from 'react';
import {
	Button,
	Content,
	ContentVariants
} from '@patternfly/react-core';
import {
	Modal,
	ModalVariant
} from '@patternfly/react-core/deprecated';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
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
          oldData.filter((entry) => entry.name != name)
        );
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
      <Content>
        <Content component={ContentVariants.h2}>
          <ExclamationTriangleIcon size="md" color="#F0AB00" /> Delete
          activation key?
        </Content>
      </Content>
    </>
  );
  const content = () => {
    if (isLoading) {
      return <Loading />;
    } else {
      return (
        <Content>
          <Content component={ContentVariants.p}>
            <b>{name}</b> will no longer be available for use. This operation
            cannot be undone.
          </Content>
        </Content>
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
