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
  const {
    isOpen,
    handleModalToggle,
    name,
    repositoryNameToDelete,
    repositoryLabelToDelete,
    handleRemoveRepository,
  } = props;
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const { mutate, isLoading } = useDeleteAdditionalRepositories();
  const queryClient = useQueryClient();

  const deleteAdditionalRepositories = (
    name,
    repositoryNameToDelete,
    repositoryLabelToDelete
  ) => {
    console.log(name, repositoryNameToDelete, repositoryLabelToDelete);
    const payload = [
      {
        repositoryLabel: repositoryLabelToDelete,
        repositoryName: repositoryNameToDelete,
      },
    ];
    console.log('Request Payload:', payload);

    mutate(
      { name, payload },
      {
        onSuccess: (data, queryName) => {
          const updatedData = data?.filter(
            (entry) => entry.repositoryName !== repositoryNameToDelete
          );
          queryClient.setQueryData(queryName, updatedData);
          addSuccessNotification(
            `Additional repository ${repositoryNameToDelete} deleted`
          );
          handleRemoveRepository(
            repositoryNameToDelete,
            repositoryLabelToDelete
          );
          handleModalToggle(true);
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
      onClick={() =>
        deleteAdditionalRepositories(
          name,
          repositoryNameToDelete,
          repositoryLabelToDelete
        )
      }
      isDisabled={isLoading}
      data-testid="delete-additional-repositories-confirmation-modal-confirm-button"
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
            <b>{repositoryNameToDelete}</b> will no longer be enabled when with
            this activation key.
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
      isDisabled={isLoading}
    >
      {content()}
    </Modal>
  );
};

DeleteAdditionalRepositoriesModal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  handleModalToggle: propTypes.func.isRequired,
  handleRemoveRepository: propTypes.func.isRequired,
  repositoryNameToDelete: propTypes.string.isRequired,
  repositoryLabelToDelete: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
};

export default DeleteAdditionalRepositoriesModal;
