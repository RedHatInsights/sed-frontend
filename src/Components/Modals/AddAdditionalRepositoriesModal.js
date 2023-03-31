import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  Modal,
  ModalVariant,
  ActionGroup,
  Button,
} from '@patternfly/react-core';
import { useQueryClient } from 'react-query';
import useAddAdditionalRepositories from '../../hooks/useAddAdditionalRepositories';
import useNotifications from '../../hooks/useNotifications';
import AddAdditionalRepositoriesTable from '../AddAdditionalRepositoriesTable';

const AddAdditionalRepositoriesModal = (props) => {
  const {
    keyName,
    handleModalToggle: parentHandleModalToggle,
    isOpen,
    repositories,
    isLoading: additionalRepositoriesAreLoading,
    error: additionalRepositoriesError,
  } = props;
  const queryClient = useQueryClient();
  const [selectedRepositories, setSelectedRepositories] = useState([]);
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const { mutate } = useAddAdditionalRepositories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleModalToggle = () => {
    setSelectedRepositories([]);
    parentHandleModalToggle();
  };
  const submitForm = () => {
    setIsSubmitting(true);
    mutate(
      { selectedRepositories, keyName },
      {
        onSuccess: () => {
          queryClient.resetQueries(`activation_key_${keyName}`);
          queryClient.resetQueries(
            `activation_key_${keyName}_available_repositories`
          );
          addSuccessNotification(
            `Repositories have been added for '${keyName}'`
          );
          setIsSubmitting(false);
        },
        onError: () => {
          addErrorNotification('Something went wrong', {
            description:
              'Your repositories could not be added. Please try again.',
          });
          setIsSubmitting(false);
        },
      }
    );
  };

  const editAdditionalRepositoriesDescription =
    'The core repositories for your operating system version, for example BaseOS and AppStream, are always enabled and do not need to be explicitly added to the activation key.';
  const editChangesButtons = (
    <ActionGroup>
      <SubmitButton
        selectedRepositories={selectedRepositories}
        keyName={keyName}
        submitForm={submitForm}
        isSubmitting={isSubmitting}
      ></SubmitButton>
      <Button
        key="cancel"
        variant="link"
        onClick={handleModalToggle}
        isDisabled={isSubmitting}
      >
        Cancel
      </Button>
    </ActionGroup>
  );

  const onClose =
    isSubmitting || additionalRepositoriesError ? null : handleModalToggle;

  return (
    <React.Fragment>
      <Modal
        variant={ModalVariant.large}
        title="Add repositories"
        description={editAdditionalRepositoriesDescription}
        isOpen={isOpen}
        onClose={onClose}
        footer={editChangesButtons}
      >
        <AddAdditionalRepositoriesTable
          repositories={repositories}
          isLoading={additionalRepositoriesAreLoading}
          error={additionalRepositoriesError}
          selectedRepositories={selectedRepositories}
          setSelectedRepositories={setSelectedRepositories}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </React.Fragment>
  );
};

const SubmitButton = ({ selectedRepositories, submitForm, isSubmitting }) => {
  const handleClick = () => {
    submitForm();
  };

  return (
    <ActionGroup>
      <Button
        variant="primary"
        onClick={handleClick}
        isLoading={isSubmitting}
        isDisabled={isSubmitting || selectedRepositories.length === 0}
        spinnerAriaValueText="Savng Changes..."
      >
        {!isSubmitting && 'Save Changes'}
        {isSubmitting && 'Saving Changes'}
      </Button>
    </ActionGroup>
  );
};

SubmitButton.propTypes = {
  keyName: propTypes.string,
  selectedRepositories: propTypes.array,
  submitForm: propTypes.func,
  isSubmitting: propTypes.bool,
};

AddAdditionalRepositoriesModal.propTypes = {
  keyName: propTypes.string,
  handleModalToggle: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired,
  repositories: propTypes.array,
  isLoading: propTypes.bool,
  error: propTypes.bool,
  buttonState: propTypes.bool,
};

export default AddAdditionalRepositoriesModal;
