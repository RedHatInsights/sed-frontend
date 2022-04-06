import * as React from 'react';
import { Button, Modal, ModalVariant } from '@patternfly/react-core';
import CreateActivationKeyForm from '../Forms/CreateActivationKeyForm';
import useCreateActivationKey from '../../hooks/useCreateActivationKey';
import propTypes from 'prop-types';
import Loading from '../LoadingState/Loading';

const CreateActivationKeyModal = (props) => {
  const { handleModalToggle, isOpen } = props;
  const { mutate, isSuccess, isError, isLoading } = useCreateActivationKey();
  const submitForm = (name, role, serviceLevel, usage) => {
    mutate({ name, role, serviceLevel, usage });
  };
  return (
    <Modal
      variant={ModalVariant.large}
      title="Create Activation Key"
      description=""
      isOpen={isOpen}
      onClose={handleModalToggle}
      actions={[
        <Button
          key="create"
          variant="primary"
          form="create-activation-key-form"
          type="submit"
        >
          Create
        </Button>,
        <Button key="cancel" variant="link" onClick={handleModalToggle}>
          Cancel
        </Button>,
      ]}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <CreateActivationKeyForm
          handleModalToggle={handleModalToggle}
          submitForm={submitForm}
          isSuccess={isSuccess}
          isError={isError}
        />
      )}
    </Modal>
  );
};

CreateActivationKeyModal.propTypes = {
  handleModalToggle: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired,
};

export default CreateActivationKeyModal;
