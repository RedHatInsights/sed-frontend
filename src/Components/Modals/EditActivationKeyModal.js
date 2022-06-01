import * as React from 'react';
import { Modal, ModalVariant } from '@patternfly/react-core';
import CreateActivationKeyForm from '../Forms/CreateActivationKeyForm';
import useUpdateActivationKey from '../../hooks/useUpdateActivationKey';
import useActivationKey from '../../hooks/useActivationKey';
import propTypes from 'prop-types';
import Loading from '../LoadingState/Loading';
import { useQueryClient } from 'react-query';

const EditActivationKeyModal = (props) => {
  const { activationKeyName } = props;
  const queryClient = useQueryClient();
  const [created, setCreated] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { handleModalToggle, isOpen } = props;
  const { mutate, isLoading } = useUpdateActivationKey();
  const {
    isLoading: isKeyLoading,
    error: keyError,
    data: activationKey,
  } = useActivationKey(activationKeyName);
  const submitForm = (name, role, serviceLevel, usage) => {
    mutate(
      { activationKeyName, role, serviceLevel, usage },
      {
        onSuccess: () => {
          setError(false);
          setCreated(true);
          queryClient.invalidateQueries('activation_keys');
        },
        onError: () => {
          setError(true);
          setCreated(false);
        },
      }
    );
  };
  return (
    <Modal
      variant={ModalVariant.large}
      title="Edit activation key"
      description=""
      isOpen={isOpen}
      onClose={handleModalToggle}
    >
      {(isLoading || isKeyLoading) && !keyError ? (
        <Loading />
      ) : (
        <CreateActivationKeyForm
          activationKey={activationKey}
          handleModalToggle={handleModalToggle}
          submitForm={submitForm}
          isSuccess={created}
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
};

export default EditActivationKeyModal;
