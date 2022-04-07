import * as React from 'react';
import { Modal, ModalVariant } from '@patternfly/react-core';
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
      title="Create new activation key"
      description=""
      isOpen={isOpen}
      onClose={handleModalToggle}
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
