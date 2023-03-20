import React, { useState } from 'react';
import { Wizard, Modal, ModalVariant, Button } from '@patternfly/react-core';

import PropTypes from 'prop-types';
import useCreateActivationKey from '../../hooks/useCreateActivationKey';
import useSystemPurposeAttributes from '../../hooks/useSystemPurposeAttributes';
import useNotifications from '../../hooks/useNotifications';
import { useQueryClient } from 'react-query';
import ReviewPage from '../Pages/ReviewPage';
import SetNamePage from '../Pages/SetNamePage';
import SetWorkloadPage from '../Pages/SetWorkLoadPage';
import SetSystemPurposePage from '../Pages/SetSystemPurposePage';

const workloadOptions = ['Latest release', 'Extended support'];
const confirmCloseTitle = 'Exit activation key creation?';
const confirmCloseBody = <p>All inputs will be discarded.</p>;
const ConfirmCloseFooter = ({ onClose, returnToWizard }) => (
  <>
    <Button variant="primary" onClick={onClose}>
      Exit
    </Button>
    <Button variant="link" onClick={returnToWizard}>
      Stay
    </Button>
  </>
);

const CreateActivationKeyWizard = ({ onClose, isOpen }) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading: createActivationKeyIsLoading } =
    useCreateActivationKey();
  const {
    isLoading: attributesAreLoading,
    error,
    data,
  } = useSystemPurposeAttributes();
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const [name, setName] = useState('');
  const [workload, setWorkload] = useState(workloadOptions[0]);
  const [role, setRole] = useState('');
  const [sla, setSla] = useState('');
  const [usage, setUsage] = useState('');
  const [isConfirmClose, setIsConfirmClose] = useState(false);
  const [shouldConfirmClose, setShouldConfirmClose] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const confirmClose = (onClose) => {
    if (shouldConfirmClose) {
      setIsConfirmClose(true);
    } else {
      onClose();
    }
  };

  const returnToWizard = () => {
    setIsConfirmClose(false);
  };

  const steps = [
    {
      id: 0,
      name: 'Name',
      component: <SetNamePage name={name} setName={setName} />,
    },
    {
      id: 1,
      name: 'Workload',
      component: (
        <SetWorkloadPage
          workloadOptions={workloadOptions}
          workload={workload}
          setWorkload={setWorkload}
        />
      ),
    },
    {
      id: 2,
      name: 'System purpose',
      component: (
        <SetSystemPurposePage
          role={role}
          setRole={setRole}
          data={data}
          sla={sla}
          setSla={setSla}
          usage={usage}
          setUsage={setUsage}
          isLoading={attributesAreLoading}
          isError={error}
        />
      ),
    },
    {
      id: 3,
      name: 'Review',
      component: (
        <ReviewPage
          name={name}
          workload={workload}
          role={role}
          sla={sla}
          usage={usage}
          isLoading={createActivationKeyIsLoading}
        />
      ),
      nextButtonText: 'Create',
    },
  ];

  return (
    <Modal
      variant={isConfirmClose ? ModalVariant.small : ModalVariant.large}
      isOpen={isOpen}
      showClose={isConfirmClose}
      title={isConfirmClose ? confirmCloseTitle : undefined}
      titleIconVariant={isConfirmClose ? 'warning' : undefined}
      footer={
        isConfirmClose ? (
          <ConfirmCloseFooter
            onClose={onClose}
            returnToWizard={returnToWizard}
          />
        ) : undefined
      }
      hasNoBodyWrapper={!isConfirmClose}
      aria-label="Create activation key wizard"
      onClose={isConfirmClose ? returnToWizard : undefined}
    >
      {!isConfirmClose && (
        <Wizard
          title="Create activation key"
          steps={steps}
          height={400}
          navAriaLabel="Create activation key steps"
          mainAriaLabel="Create activation key content"
          onCurrentStepChanged={(step) => {
            if (step.id > 0) setShouldConfirmClose(true);
            setCurrentStep(step.id);
          }}
          startAtStep={currentStep + 1}
          onSave={() => {
            mutate(
              { name, role, serviceLevel: sla, usage },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries('activation_keys');
                  addSuccessNotification(`Activation key "${name}" created`);
                  onClose();
                },
                onError: () => {
                  addErrorNotification('Something went wrong', {
                    description:
                      'Your changes could not be saved. Please try again.',
                  });
                  onClose();
                },
              }
            );
          }}
          onClose={() => confirmClose(onClose)}
        />
      )}
      {isConfirmClose && confirmCloseBody}
    </Modal>
  );
};

ConfirmCloseFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
  returnToWizard: PropTypes.func.isRequired,
};

CreateActivationKeyWizard.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default CreateActivationKeyWizard;
