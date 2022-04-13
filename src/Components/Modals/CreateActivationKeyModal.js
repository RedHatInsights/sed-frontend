import * as React from 'react';
import { Modal, ModalVariant } from '@patternfly/react-core';
import CreateActivationKeyForm from '../Forms/CreateActivationKeyForm';
import useCreateActivationKey from '../../hooks/useCreateActivationKey';
import propTypes from 'prop-types';
import Loading from '../LoadingState/Loading';
import { useQueryClient } from 'react-query';

const CreateActivationKeyModal = (props) => {
  const queryClient = useQueryClient();
  const [created, setCreated] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { handleModalToggle, isOpen } = props;
  const { mutate, isLoading } = useCreateActivationKey();
  const submitForm = (name, role, serviceLevel, usage) => {
    mutate(
      { name, role, serviceLevel, usage },
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
          isSuccess={created}
          isError={error}
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
