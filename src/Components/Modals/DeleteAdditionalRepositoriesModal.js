import React from 'react';
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
import useNotifications from '../../hooks/useNotifications';
import { useQueryClient } from '@tanstack/react-query';
import useDeleteAdditionalRepositories from '../../hooks/useDeleteAdditionalRepositories';

const DeleteAdditionalRepositoriesModal = (props) => {
  const {
    isOpen,
    handleModalToggle,
    name,
    repositoryNameToDelete,
    repositoryLabelToDelete,
  } = props;
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const { mutate, isLoading } = useDeleteAdditionalRepositories();
  const queryClient = useQueryClient();

  const deleteAdditionalRepositories = (
    name,
    repositoryNameToDelete,
    repositoryLabelToDelete
  ) => {
    const payload = [
      {
        repositoryLabel: repositoryLabelToDelete,
        repositoryName: repositoryNameToDelete,
      },
    ];

    mutate(
      { name, payload },
      {
        onSuccess: (data, queryName) => {
          const updatedData = data?.filter(
            (entry) => entry.repositoryName !== repositoryNameToDelete
          );
          addSuccessNotification(
            `Additional repository ${repositoryNameToDelete} deleted`
          );
          queryClient.invalidateQueries(queryName, updatedData);
          handleModalToggle();
        },
        onError: () => {
          addErrorNotification('Something went wrong. Please try again');
          handleModalToggle();
        },
      }
    );
  };

  const actions = [
    <Button
      key="confirm"
      variant="danger"
      isLoading={isLoading}
      onClick={() =>
        deleteAdditionalRepositories(
          name,
          repositoryNameToDelete,
          repositoryLabelToDelete
        )
      }
      isDisabled={isLoading}
      spinnerAriaValueText="Removing repository"
    >
      {isLoading ? 'Removing repository' : 'Remove repository'}
    </Button>,
    <Button
      key="cancel"
      variant="link"
      onClick={handleModalToggle}
      isDisabled={isLoading}
    >
      Cancel
    </Button>,
  ];

  const title = (
    <>
      <TextContent>
        <Text component={TextVariants.h2}>
          <ExclamationTriangleIcon size="md" color="#F0AB00" />
          Remove repository?
        </Text>
      </TextContent>
    </>
  );

  const content = (
    <>
      <TextContent>
        <Text component={TextVariants.p}>
          <b>{repositoryNameToDelete}</b> will no longer be enabled when
          registering with this activation key.
        </Text>
      </TextContent>
    </>
  );

  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={handleModalToggle}
      variant={ModalVariant.small}
      actions={actions}
      isDisabled={isLoading}
    >
      {content}
    </Modal>
  );
};

DeleteAdditionalRepositoriesModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleModalToggle: propTypes.func.isRequired,
  repositoryNameToDelete: propTypes.string.isRequired,
  repositoryLabelToDelete: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};

export default DeleteAdditionalRepositoriesModal;
