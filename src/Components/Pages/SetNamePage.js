import React from 'react';
import PropTypes from 'prop-types';
import {
  Title,
  Text,
  TextInput,
  TextVariants,
  FormGroup,
  Form,
} from '@patternfly/react-core';

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
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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

export default SetNamePage;
