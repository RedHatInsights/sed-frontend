import React from 'react';
import propTypes from 'prop-types';
import { Modal, ModalVariant, Button } from '@patternfly/react-core';
import EditAdditionalRepositoriesTable from '../EditAdditionalRepositoriesTable/EditAdditionalRepositoriesTable';

const EditAdditionalRepositoriesModal = (props) => {
  const { handleModalToggle, isOpen, repositories, isLoading, error } = props;
  const editAdditionalRepositoriesDescription =
    'The core repositories for your operating system version, for example BaseOS and AppStream, are always enabled and do not need to be explicitly added to the activation key.';

  return (
    <React.Fragment>
      <Modal
        variant={ModalVariant.large}
        title="Edit additional repositories"
        description={editAdditionalRepositoriesDescription}
        isOpen={isOpen}
        onClose={handleModalToggle}
        actions={[
          <Button
            key="Save changes"
            variant="primary"
            onClick={handleModalToggle}
          >
            Save Changes
          </Button>,
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>,
        ]}
      >
        <EditAdditionalRepositoriesTable
          repositories={repositories}
          isLoading={isLoading}
          error={error}
        />
      </Modal>
    </React.Fragment>
  );
};

EditAdditionalRepositoriesModal.propTypes = {
  handleModalToggle: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired,
  modalSize: propTypes.string,
  repositories: propTypes.array,
  isLoading: propTypes.func,
  error: propTypes.func,
};

export default EditAdditionalRepositoriesModal;
