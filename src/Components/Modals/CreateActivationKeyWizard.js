import React, { useState } from 'react';
import {
  Title,
  Text,
  TextInput,
  TextVariants,
  Wizard,
  FormGroup,
  FormSelectOption,
  FormSelect,
  Radio,
  Modal,
  ModalVariant,
  Button,
  Form,
} from '@patternfly/react-core';
import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
} from '@patternfly/react-core';
import PropTypes from 'prop-types';
import useCreateActivationKey from '../../hooks/useCreateActivationKey';
import useSystemPurposeAttributes from '../../hooks/useSystemPurposeAttributes';
import useNotifications from '../../hooks/useNotifications';
import { useQueryClient } from 'react-query';
import Loading from '../LoadingState/Loading';

const SetNamePage = ({ name, setName }) => {
  const helperText =
    'Your activation key name must be unique and must contain only numbers, letters, underscores, and hyphens.';

  return (
    <>
      <Title headingLevel="h2" className="pf-u-mb-sm">
        Name key
      </Title>
      <Text component={TextVariants.p} className="pf-u-mb-xl">
        This name cannot be modified after the activation key is created.
      </Text>
      <Form onSubmit={(e) => {e.preventDefault()}}>
        <FormGroup
          label="Name"
          isRequired
          helperText={helperText}
          fieldId="activation-key-name"
        >
          <TextInput
            id="activation-key-name"
            isRequired
            type="text"
            value={name}
            onChange={setName}
          />
        </FormGroup>
      </Form>
    </>
  );
};

SetNamePage.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};

const SetWorkloadPage = ({ workloadOptions, workload, setWorkload }) => {
  return (
    <>
      <Title headingLevel="h2" className="pf-u-mb-sm">
        Select Workload
      </Title>
      <Text component={TextVariants.p} className="pf-u-mb-xl">
        Choose a workload option to associate an appropriate selection of
        repositories to the activation key. Repositories can be edited on the
        activation key detail page.{' '}
      </Text>
      {workloadOptions.map((wl) => {
        return (
          <Radio
            label={wl}
            onChange={() => setWorkload(wl)}
            isChecked={wl == workload}
            className="pf-u-mb-md"
            name={wl}
            id={wl}
            isDisabled={wl == 'Extended support'}
            key={wl}
          />
        );
      })}
    </>
  );
};

SetWorkloadPage.propTypes = {
  workloadOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  workload: PropTypes.string.isRequired,
  setWorkload: PropTypes.func.isRequired,
};

const SetSystemPurposePage = ({
  role,
  setRole,
  sla,
  setSla,
  usage,
  setUsage,
  data,
  isLoading,
  isError,
}) => {
  const Options = ({ options }) => (
    <>
      {options.map((option) => (
        <FormSelectOption key={option} value={option} label={option} />
      ))}
    </>
  );
  Options.propTypes = {
    options: PropTypes.array.isRequired,
  };
  const Placeholder = () => (
    <FormSelectOption label="Not defined" isPlaceholder />
  );
  return isLoading ? (
    <Loading />
  ) : (
    !isError && (
      <>
        <Title headingLevel="h2" className="pf-u-mb-sm">
          Select system purpose
        </Title>
        <Text component={TextVariants.p} className="pf-u-mb-xl">
          System purpose values are used by the subscriptions service to help
          filter and identify hosts. Setting values for these attributes is an
          optional step, but doing so ensures that subscriptions reporting
          accurately reflects the system. Only those values available to your
          account are shown.
        </Text>
        <Form>
          <FormGroup
            label="Role"
            className="pf-u-mb-sm"
            fieldId="activation-key-role"
          >
            <FormSelect
              onChange={setRole}
              value={role}
              id="activation-key-role"
            >
              <Options options={data.roles} />
              <Placeholder />
            </FormSelect>
          </FormGroup>
          <FormGroup
            label="Service level agreement (SLA)"
            className="pf-u-mb-sm"
            fieldId="activation-key-sla"
          >
            <FormSelect onChange={setSla} value={sla} id="activation-key-sla">
              <Options options={data.serviceLevel} />
              <Placeholder />
            </FormSelect>
          </FormGroup>
          <FormGroup
            label="Usage"
            className="pf-u-mb-sm"
            fieldId="activation-key-usage"
          >
            <FormSelect
              onChange={setUsage}
              value={usage}
              id="activation-key-usage"
            >
              <Options options={data.usage} />
              <Placeholder />
            </FormSelect>
          </FormGroup>
        </Form>
      </>
    )
  );
};

SetSystemPurposePage.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  sla: PropTypes.string.isRequired,
  setSla: PropTypes.func.isRequired,
  usage: PropTypes.string.isRequired,
  setUsage: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
};

const ReviewPage = ({ name, workload, role, sla, usage, isLoading }) => {
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Title headingLevel="h2" className="pf-u-mb-sm">
        Review
      </Title>
      <Text component={TextVariants.p} className="pf-u-mb-xl">
        Review the following information and click <b>Create</b> to create the
        activation key.
      </Text>
      <DescriptionList
        isHorizontal
        horizontalTermWidthModifier={{
          default: '21ch',
        }}
      >
        <DescriptionListGroup>
          <DescriptionListTerm>Name</DescriptionListTerm>
          <DescriptionListDescription>{name}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Workload</DescriptionListTerm>
          <DescriptionListDescription>{workload}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Role</DescriptionListTerm>
          <DescriptionListDescription>
            {role || 'Not defined'}
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>
            Service level agreement (SLA)
          </DescriptionListTerm>
          <DescriptionListDescription>
            {sla || 'Not defined'}
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Usage</DescriptionListTerm>
          <DescriptionListDescription>
            {usage || 'Not defined'}
          </DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
    </>
  );
};

ReviewPage.propTypes = {
  name: PropTypes.string.isRequired,
  workload: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  sla: PropTypes.string.isRequired,
  usage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

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

ConfirmCloseFooter.propTypes = {
  onClose: PropTypes.func.isRequired,
  returnToWizard: PropTypes.func.isRequired,
};

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

CreateActivationKeyWizard.propTypes = {
  onClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default CreateActivationKeyWizard;
