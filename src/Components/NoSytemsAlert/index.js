import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertActionCloseButton,
  ClipboardCopy,
  Form,
  FormGroup,
  Grid,
  GridItem,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { CopyIcon } from '@patternfly/react-icons';

function NoSystemsAlert({ handleClose }) {
  return (
    <Alert
      title={
        <Title headingLevel="h2" size="xl">
          Red Hat connector (RHC)
        </Title>
      }
      actionClose={<AlertActionCloseButton onClick={handleClose} />}
      isInline
      customIcon={<Fragment />}
      className="pf-u-mb-lg"
    >
      <TextContent>
        <Text>
          Red Hat connector allows you to connect your systems to Red Hat with
          one command.
        </Text>
        <Text>
          Systems will be automatically set up to use the services turned on in
          the &#34;Services&#34; tab.
        </Text>
        <Text>Red Hat connector is for RHEL 8.4 systems and newer.</Text>
        <Text>
          To register other RHEL systems, check out the&nbsp;
          <a href="./insights/registration">Registration Assistant</a>.
        </Text>
        <Form onSubmit={(event) => event.preventDefault()}>
          <Grid hasGutter>
            <GridItem sm={12} md={6} lg={4}>
              <FormGroup
                label="Register with an activation key"
                helperText={
                  <span className="pf-c-form__helper-text">
                    Click the <CopyIcon /> icon on a row to copy the command
                    with your values
                  </span>
                }
              >
                <ClipboardCopy>
                  rhc --connect -[activationkey-namehere] -[organization Id]
                </ClipboardCopy>
              </FormGroup>
            </GridItem>
            <GridItem sm={12} md={6} lg={4}>
              <FormGroup
                label="Register with ausername and password"
                helperText={
                  <span className="pf-c-form__helper-text">
                    Click the <CopyIcon /> icon on a row to copy the command
                    with your values
                  </span>
                }
              >
                <ClipboardCopy>
                  rhc --connect -[username] -[password]
                </ClipboardCopy>
              </FormGroup>
            </GridItem>
          </Grid>
        </Form>
      </TextContent>
    </Alert>
  );
}

NoSystemsAlert.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default NoSystemsAlert;
