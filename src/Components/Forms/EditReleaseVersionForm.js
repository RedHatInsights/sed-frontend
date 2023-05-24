import React, { useState } from 'react';
import {
  ActionGroup,
  Button,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
} from '@patternfly/react-core';
import useUpdateActivationKey from '../../hooks/useUpdateActivationKey';
import { useQueryClient } from 'react-query';
import useNotifications from '../../hooks/useNotifications';
import PropTypes from 'prop-types';

export const EditReleaseVersionForm = ({
  releaseVersions,
  activationKey,
  onClose,
}) => {
  const [selectedVersion, setSelectedVersion] = useState(
    activationKey.releaseVersion
  );
  const { mutate, isLoading } = useUpdateActivationKey();
  const { addSuccessNotification, addErrorNotification } = useNotifications();
  const queryClient = useQueryClient();

  const options = releaseVersions.map((version, i) => (
    <FormSelectOption value={version} label={version} key={i} />
  ));

  if (!activationKey.releaseVersion) {
    options.push(
      <FormSelectOption
        value=""
        label="Not defined"
        key={releaseVersions?.length}
        isDisabled
      />
    );
  }

  const submitForm = () => {
    mutate(
      {
        releaseVersion: selectedVersion,
        activationKeyName: activationKey.name,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(`activation_key_${activationKey.name}`);
          addSuccessNotification(
            `Changes saved for activation key "${activationKey.name}"`
          );
          onClose();
        },
        onError: () => {
          addErrorNotification(
            `Error updating activation key ${activationKey.name}.`
          );
          onClose();
        },
      }
    );
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        submitForm();
      }}
    >
      <FormGroup label="Release version" type="string">
        <FormSelect
          value={selectedVersion}
          onChange={(version) => setSelectedVersion(version)}
          aria-label="Release version form input"
          isDisabled={isLoading}
        >
          {options}
        </FormSelect>
      </FormGroup>
      <ActionGroup className="pf-u-mt-0">
        <Button
          key="save"
          id="submit-release-version-form-button"
          variant="primary"
          type="submit"
          isDisabled={
            selectedVersion === activationKey.releaseVersion || isLoading
          }
          isLoading={isLoading}
        >
          {'Save changes'}
        </Button>
      </ActionGroup>
    </Form>
  );
};

EditReleaseVersionForm.propTypes = {
  releaseVersions: PropTypes.array,
  activationKey: PropTypes.object,
  onClose: PropTypes.func,
};
