import * as React from 'react';
import { Modal, ModalVariant } from '@patternfly/react-core';
import ActivationKeyForm from '../Forms/ActivationKeyForm';
import useUpdateActivationKey from '../../hooks/useUpdateActivationKey';
import useActivationKey from '../../hooks/useActivationKey';
import propTypes from 'prop-types';
import Loading from '../LoadingState/Loading';
import { useQueryClient } from '@tanstack/react-query';
import SystemPurposeForm from '../Forms/SystemPurposeForm';
import useNotifications from '../../hooks/useNotifications';

const EditActivationKeyModal = (props) => {
  const {
    activationKeyName,
    title,
    description,
    systemPurposeOnly,
    modalSize,
  } = props;
  const queryClient = useQueryClient();
  const [updated, setUpdated] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { handleModalToggle, isOpen } = props;
  const { mutate, isLoading } = useUpdateActivationKey();
  const { addErrorNotification, addSuccessNotification } = useNotifications();
  const {
    isLoading: isKeyLoading,
    error: keyError,
    data: activationKey,
  } = useActivationKey(activationKeyName);
  const modalSizes = {
    small: ModalVariant.small,
    large: ModalVariant.large,
  };
  const submitForm = (formData) => {
    const { role, serviceLevel, usage } = formData;
    mutate(
      { activationKeyName, role, serviceLevel, usage },
      {
        onSuccess: () => {
          setError(false);
          setUpdated(true);
          queryClient.invalidateQueries(['activation_keys']);
          queryClient.resetQueries([`activation_key_${activationKeyName}`]);
          handleModalToggle();
          const successMessage = `Changes saved for activation key "${activationKey.name}"`;
          addSuccessNotification(successMessage, {
            timeout: false,
          });
        },
        onError: () => {
          setError(true);
          setUpdated(false);
          handleModalToggle();
          const errorMessage = activationKey
            ? `Error updating activation key ${activationKey.name}.`
            : 'Activation Key was not created, please try again.';
          addErrorNotification(errorMessage, {
            timeout: 8000,
          });
        },
      }
    );
  };

  return (
    <Modal
      variant={modalSizes[modalSize]}
      title={title}
      description={description}
      isOpen={isOpen}
      onClose={handleModalToggle}
    >
      {(isLoading || isKeyLoading) && !keyError ? (
        <Loading />
      ) : systemPurposeOnly ? (
        <SystemPurposeForm
          activationKey={activationKey}
          handleModalToggle={handleModalToggle}
          submitForm={submitForm}
          isSuccess={updated}
          isError={error}
        />
      ) : (
        <ActivationKeyForm
          activationKey={activationKey}
          handleModalToggle={handleModalToggle}
          submitForm={submitForm}
          isSuccess={updated}
          isError={error}
        />
      )}
    </Modal>
  );
};

EditActivationKeyModal.propTypes = {
  handleModalToggle: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired,
  activationKeyName: propTypes.string,
  systemPurposeOnly: propTypes.bool,
  description: propTypes.string,
  title: propTypes.string,
  modalSize: propTypes.string,
};

export default EditActivationKeyModal;
