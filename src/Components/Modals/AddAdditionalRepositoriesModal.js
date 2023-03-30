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

const ProgressButton = ({ selectedRepositories, submitForm, isSubmitting }) => {
  const [buttonState, setButtonState] = useState('notClicked');
  const handleClick = () => {
    setButtonState('clicked');
    submitForm();
  };

  return (
    <ActionGroup>
      <Button
        variant="primary"
        onClick={handleClick}
        isLoading={buttonState === 'clicked'}
        isDisabled={isSubmitting || selectedRepositories.length === 0}
        spinnerAriaValueText="Saving Changes..."
      >
        {buttonState === 'notClicked' && 'Save Changes'}
        {buttonState === 'clicked' && 'Saving Changes'}
      </Button>
    </ActionGroup>
  );
};
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleModalToggle = () => {
    setSelectedRepositories([]);
    parentHandleModalToggle();
  };
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const { mutate } = useAddAdditionalRepositories();
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
          handleModalToggle();
        },
      }
    );
  };
  const editAdditionalRepositoriesDescription =
    'The core repositories for your operating system version, for example BaseOS and AppStream, are always enabled and do not need to be explicitly added to the activation key.';
  const editChangesButtons = (
    <ActionGroup>
      <ProgressButton
        selectedRepositories={selectedRepositories}
        keyName={keyName}
        submitForm={submitForm}
        isSubmitting={isSubmitting}
      >
        Save Changes
      </ProgressButton>
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
  return (
    <React.Fragment>
      <Modal
        variant={ModalVariant.large}
        title="Add repositories"
        description={editAdditionalRepositoriesDescription}
        isOpen={isOpen}
        onClose={isSubmitting ? null : handleModalToggle}
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

ProgressButton.propTypes = {
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
  isLoading: propTypes.func,
  error: propTypes.func,
  buttonState: propTypes.bool,
};

export default AddAdditionalRepositoriesModal;
