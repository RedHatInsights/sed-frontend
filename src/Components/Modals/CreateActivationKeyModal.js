import * as React from 'react';
import { Modal, ModalVariant } from '@patternfly/react-core';
import ActivationKeyForm from '../Forms/ActivationKeyForm';
import useCreateActivationKey from '../../hooks/useCreateActivationKey';
import propTypes from 'prop-types';
import Loading from '../LoadingState/Loading';
import { useQueryClient } from 'react-query';
import useFeatureFlag from '../../hooks/useFeatureFlag';
import CreateActivationKeyWizard from './CreateActivationKeyWizard';

const CreateActivationKeyModal = (props) => {
  const queryClient = useQueryClient();
  const [created, setCreated] = React.useState(false);
  const [error, setError] = React.useState(false);
  const { handleModalToggle, isOpen } = props;
  const { mutate, isLoading } = useCreateActivationKey();
  const showNewWizard = useFeatureFlag(
    'sed-frontend.activationKeysDetailsPage'
  );
  const submitForm = (formData) => {
    const { name, role, serviceLevel, usage } = formData;
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
  const CreateActivationKeyWizardModal = () => (
    <CreateActivationKeyWizard onClose={handleModalToggle} isOpen={isOpen} />
  );
  const LegacyModel = () => (
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
        <ActivationKeyForm
          handleModalToggle={handleModalToggle}
          submitForm={submitForm}
          isSuccess={created}
          isError={error}
        />
      )}
    </Modal>
  );
  return showNewWizard ? <CreateActivationKeyWizardModal /> : <LegacyModel />;
};

CreateActivationKeyModal.propTypes = {
  handleModalToggle: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired,
  activationKeyName: propTypes.string,
};

export default CreateActivationKeyModal;
