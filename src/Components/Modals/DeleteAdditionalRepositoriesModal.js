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
import useNotifications from '../../hooks/useNotifications';
import { useQueryClient } from 'react-query';
import useDeleteAdditionalRepositories from '../../hooks/useDeleteAdditionalRepositories';
import Loading from '../LoadingState/Loading';

const DeleteAdditionalRepositoriesModal = (props) => {
  const { isOpen, handleModalToggle, name } = props;
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const { mutate, isLoading } = useDeleteAdditionalRepositories();
  const queryClient = useQueryClient();

  const deleteAdditionalRepositories = (name) => {
    mutate(name, {
      onSuccess: (_data, name) => {
        queryClient.setQueryData('activation_key_${keyName}', (oldData) =>
          oldData.filter((entry) => entry.name != name)
        );
        addSuccessNotification(`Additional repository ${name} deleted`);
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
      onClick={() => deleteAdditionalRepositories(name)}
      data-testid="delete-additional-repositories-confirmation-modal-confirm-button"
    >
      Remove Repository
    </Button>,
    <Button key="cancel" variant="link" onClick={handleModalToggle}>
      Cancel
    </Button>,
  ];

  const title = (
    <>
      <TextContent>
        <Text component={TextVariants.h2}>
          <ExclamationTriangleIcon size="md" color="#F0AB00" />
          {''} Remove repository?
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
            <b>{name}</b> will no longer be enabled when registering with this
            activation key.
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

DeleteAdditionalRepositoriesModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleModalToggle: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
};

export default DeleteAdditionalRepositoriesModal;
