import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Modal, ModalVariant } from '@patternfly/react-core';
import EditAdditionalRepositoriesTable from '../EditAdditionalRepositoriesTable/EditAdditionalRepositoriesTable';
import { useQueryClient } from 'react-query';
import useAddAdditionalRepositories from '../../hooks/useAddAdditionalRepositories';
import useNotifications from '../../hooks/useNotifications';

const EditAdditionalRepositoriesModal = (props) => {
  const { keyName, handleModalToggle, isOpen, repositories } = props;
  const queryClient = useQueryClient();

  const [additionalRepos, setAdditionalRepos] = useState([]);

  const [created, setCreated] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const { mutate, isLoading } = useAddAdditionalRepositories();
  const submitForm = () => {
    mutate(
      { additionalRepos, keyName },
      {
        onSuccess: () => {
          setError(false);
          setCreated(true);
          queryClient.invalidateQueries('activation_keys');
          queryClient.resetQueries(`activation_key_${keyName}`);
          queryClient.resetQueries(
            `activation_key_${keyName}_available_repositories`
          );
          addSuccessNotification(
            `Repositories have been added for '${keyName}'`
          );
        },
        onError: () => {
          addErrorNotification('Something went wrong', {
            description:
              'Your repositories could not be added. Please try again.',
          });
          setError(true);
          setCreated(false);
        },
      }
    );
  };
  const editAdditionalRepositoriesDescription =
    'The core repositories for your operating system version, for example BaseOS and AppStream, are always enabled and do not need to be explicitly added to the activation key.';

  return (
    <React.Fragment>
      <Modal
        variant={ModalVariant.large}
        title="Add repositories"
        description={editAdditionalRepositoriesDescription}
        isOpen={isOpen}
        onClose={handleModalToggle}
      >
        <EditAdditionalRepositoriesTable
          repositories={repositories}
          handleModalToggle={handleModalToggle}
          setAdditionalRepos={setAdditionalRepos}
          submitForm={submitForm}
          isSuccess={created}
          isError={error}
          isLoading={isLoading}
          error={error}
        />
      </Modal>
    </React.Fragment>
  );
};

EditAdditionalRepositoriesModal.propTypes = {
  keyName: propTypes.string,
  handleModalToggle: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired,
  modalSize: propTypes.string,
  repositories: propTypes.array,
  isLoading: propTypes.func,
  error: propTypes.func,
};

export default EditAdditionalRepositoriesModal;
