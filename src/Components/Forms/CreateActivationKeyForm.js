import React, { useState } from 'react';
import {
  ActionGroup,
  Button,
  Form,
  FormGroup,
  Popover,
  TextInput,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import HelpIcon from '@patternfly/react-icons/dist/js/icons/help-icon';
import useSystemPurposeAttributes from '../../hooks/useSystemPurposeAttributes';
import ActivationKeysFormSelect from './ActivationKeysFormSelect';
import PropTypes from 'prop-types';
import useNotifications from '../../hooks/useNotifications';

const CreateActivationKeyForm = (props) => {
  const { handleModalToggle, submitForm, isSuccess, isError } = props;
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const { isLoading, error, data } = useSystemPurposeAttributes();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [serviceLevel, setServiceLevel] = useState('');
  const [usage, setUsage] = useState('');
  const [validated, setValidated] = useState('default');
  const nameRegex = '^[a-zA-Z0-9-_]*$';

  const validationText =
    'Provide a name to be used when registering the activation key. Your activation key name must be unique, may contain only numbers, letters, underscores, and hyphens, and less than 256 characters.';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validated === 'success') {
      submitForm(name, role, serviceLevel, usage);
    } else {
      setValidated('error');
    }
  };

  const validateName = (value) => {
    if (value.length === 0 || value.length > 255) {
      setValidated('error');
    } else if (!value.match(nameRegex)) {
      setValidated('error');
    } else {
      setValidated('success');
      setName(value);
    }
  };

  const createButtonDisabled = () => {
    return validated === 'error' || name.length === 0 || !name.match(nameRegex);
  };

  if (isSuccess) {
    addSuccessNotification('Activation Key was created successfully', {
      timeout: false,
    });
    handleModalToggle();
  } else if (isError) {
    addErrorNotification('Activation Key was not created, please try again', {
      timeout: 8000,
    });
    handleModalToggle();
  }

  return (
    <Form id="create-activation-key-form" onSubmit={handleSubmit}>
      <FormGroup label="Name" isRequired helperText={validationText}>
        <TextInput
          id="activation-key-name"
          label="Name"
          isRequired
          type="text"
          validated={validated}
          onChange={validateName}
          name="name"
        />
      </FormGroup>
      {!isLoading && !error && (
        <ActivationKeysFormSelect
          data={data.roles}
          onSelect={setRole}
          label="Role"
          name="role"
          placeholderValue="Select role"
          popover={
            <Popover
              bodyContent={
                <TextContent>
                  <Text component={TextVariants.p}>
                    Role is used to categorize systems by the workload on the
                    system
                  </Text>
                  <Text component={TextVariants.p}>
                    Subscription Watch can help you filter and report by these
                    items.
                  </Text>
                  <Text component={TextVariants.p}>
                    Only roles available to your account are shown.
                  </Text>
                </TextContent>
              }
            >
              <HelpIcon />
            </Popover>
          }
          helperText="Select the required role from the list. The list only contains roles available to the activation key."
        />
      )}
      {!isLoading && !error && (
        <ActivationKeysFormSelect
          data={data.serviceLevel}
          onSelect={setServiceLevel}
          label="Service Level Agreement (SLA)"
          name="serviceLevel"
          placeholderValue="Select a service level agreement"
          popover={
            <Popover
              bodyContent={
                <TextContent>
                  <Text component={TextVariants.p}>
                    Service Level Agreement (SLA) determines the level of
                    support for systems registered with this activation key.
                  </Text>
                </TextContent>
              }
            >
              <HelpIcon />
            </Popover>
          }
          helperText="Select the required service level from the list. The list only contains service levels available to the activation key."
        />
      )}
      {!isLoading && !error && (
        <ActivationKeysFormSelect
          data={data.usage}
          onSelect={setUsage}
          label="Usage"
          name="usage"
          placeholderValue="Select usage"
          popover={
            <Popover
              bodyContent={
                <TextContent>
                  <Text component={TextVariants.p}>
                    Usage is used to categorize systems by how they are meant to
                    be used, and therefore supported.
                  </Text>
                  <Text component={TextVariants.p}>
                    Subscription Watch can help you filter and report by these
                    items.
                  </Text>
                </TextContent>
              }
            >
              <HelpIcon />
            </Popover>
          }
          helperText="Select the required usage from the list. The list only contains usages available to the activation key."
        />
      )}
      <ActionGroup>
        <Button
          key="create"
          id="create-activation-key-button"
          variant="primary"
          type="submit"
          isDisabled={createButtonDisabled()}
        >
          Save
        </Button>

        <Button
          key="cancel"
          id="cancel-create-activation-key-button"
          variant="link"
          onClick={handleModalToggle}
        >
          Cancel
        </Button>
      </ActionGroup>
    </Form>
  );
};

CreateActivationKeyForm.propTypes = {
  handleModalToggle: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
};

export default CreateActivationKeyForm;
