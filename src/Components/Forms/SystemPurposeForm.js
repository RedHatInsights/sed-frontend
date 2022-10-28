import React, { useEffect, useState } from 'react';
import { ActionGroup, Button, Form } from '@patternfly/react-core';
import useSystemPurposeAttributes from '../../hooks/useSystemPurposeAttributes';
import ActivationKeysFormSelect from './ActivationKeysFormSelect';
import PropTypes from 'prop-types';
import useNotifications from '../../hooks/useNotifications';

const SystemPurposeForm = (props) => {
  const { handleModalToggle, submitForm, isSuccess, isError, activationKey } =
    props;
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const { isLoading, error, data } = useSystemPurposeAttributes();
  const [role, setRole] = useState('');
  const [serviceLevel, setServiceLevel] = useState('');
  const [usage, setUsage] = useState('');
  const [validated, setValidated] = useState('default');
  const placeholderValue = 'Not defined';
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validated === 'success' || activationKey) {
      submitForm({ role: role, serviceLevel: serviceLevel, usage: usage });
    } else {
      setValidated('error');
    }
  };

  useEffect(() => {
    if (activationKey) {
      setRole(activationKey.role);
      setUsage(activationKey.usage);
      setServiceLevel(activationKey.serviceLevel);
    }
  }, [activationKey]);

  const createButtonDisabled = () => {
    return (
      activationKey.role === role &&
      activationKey.serviceLevel === serviceLevel &&
      activationKey.usage === usage
    );
  };

  if (isSuccess) {
    const successMessage = activationKey
      ? `Activation key ${activationKey.name} updated successfully.`
      : 'Activation key created successfully.';
    addSuccessNotification(successMessage, {
      timeout: false,
    });
    handleModalToggle();
  } else if (isError) {
    const errorMessage = activationKey
      ? `Error updating activation key ${activationKey.name}.`
      : 'Activation Key was not created, please try again.';
    addErrorNotification(errorMessage, {
      timeout: 8000,
    });
    handleModalToggle();
  }

  return (
    <Form id="activation-key-form" onSubmit={handleSubmit}>
      {!isLoading && !error && (
        <ActivationKeysFormSelect
          data={data.roles}
          value={role}
          onSelect={setRole}
          label="Role"
          name="role"
          placeholderValue={placeholderValue}
          disableDefaultValues={false}
        />
      )}
      {!isLoading && !error && (
        <ActivationKeysFormSelect
          data={data.serviceLevel}
          value={serviceLevel}
          onSelect={setServiceLevel}
          label="Service Level Agreement (SLA)"
          name="serviceLevel"
          placeholderValue={placeholderValue}
          disableDefaultValues={false}
        />
      )}
      {!isLoading && !error && (
        <ActivationKeysFormSelect
          data={data.usage}
          value={usage}
          onSelect={setUsage}
          label="Usage"
          name="usage"
          placeholderValue={placeholderValue}
          disableDefaultValues={false}
        />
      )}
      <ActionGroup>
        <Button
          key="create"
          id="submit-activation-key-button"
          variant="primary"
          type="submit"
          isDisabled={createButtonDisabled()}
          data-testid="activation-key-submit-button"
        >
          {activationKey ? 'Save changes' : 'Create'}
        </Button>

        <Button
          key="cancel"
          id="cancel-activation-key-button"
          variant="link"
          onClick={handleModalToggle}
        >
          Cancel
        </Button>
      </ActionGroup>
    </Form>
  );
};

SystemPurposeForm.propTypes = {
  handleModalToggle: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool,
  isError: PropTypes.bool,
  activationKey: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default SystemPurposeForm;
