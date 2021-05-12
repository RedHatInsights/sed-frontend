import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AlertActionCloseButton,
  Form,
  Grid,
  GridItem,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { RegisterWithActivationKey, RegisterWithUserName } from '../FormGroups';

const NoSystemsAlert = ({ handleClose }) => (
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
        Red Hat connector allows you to connect your systems to Red Hat with one
        command.
      </Text>
      <Text>
        Systems will be automatically set up to use the services turned on in
        the dashboard below.
      </Text>
      <Text>Red Hat connector is for RHEL 8.4 systems and newer.</Text>
      <Text>
        To register other RHEL systems, check out the&nbsp;
        <a
          target="_blank"
          rel="noreferer noopener"
          href="./insights/registration"
        >
          Registration Assistant
        </a>
        .
      </Text>
      <Form onSubmit={(event) => event.preventDefault()}>
        <Grid hasGutter>
          <GridItem sm={12} md={6} lg={4}>
            <RegisterWithActivationKey />
          </GridItem>
          <GridItem sm={12} md={6} lg={4}>
            <RegisterWithUserName />
          </GridItem>
        </Grid>
      </Form>
    </TextContent>
  </Alert>
);

NoSystemsAlert.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default NoSystemsAlert;
