import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Title,
  Text,
  TextInput,
  TextVariants,
  FormGroup,
  Form,
} from '@patternfly/react-core';

const SetNamePage = ({ name, setName, nameIsValid }) => {
  const [enableValidationFeedback, setEnableValidationFeedback] =
    useState(false);

  const helperText =
    'Your activation key name must be unique and must contain only numbers, letters, underscores, and hyphens.';

  return (
    <>
      <Title headingLevel="h2" className="pf-v5-u-mb-sm">
        Name key
      </Title>
      <Text component={TextVariants.p} className="pf-v5-u-mb-xl">
        This name cannot be modified after the activation key is created.
      </Text>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <FormGroup
          label="Name"
          isRequired
          HelperText={helperText}
          fieldId="activation-key-name"
          // Which one should I use here ? FormHelperText, HelperText, or HelperTextItem
          validated={
            nameIsValid || !enableValidationFeedback ? 'default' : 'error'
          }
          // Which one should I use here ? FormHelperText, HelperText, or HelperTextItem
          helperTextInvalid={`Name requirements have not been met. ${helperText}`}
        >
          <TextInput
            id="activation-key-name"
            isRequired
            type="text"
            value={name}
            onChange={(_event, name) => setName(name)}
            validated={
              nameIsValid || !enableValidationFeedback ? 'default' : 'error'
            }
            onBlur={() => setEnableValidationFeedback(true)}
          />
        </FormGroup>
      </Form>
    </>
  );
};

SetNamePage.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  nameIsValid: PropTypes.bool.isRequired,
};

export default SetNamePage;
