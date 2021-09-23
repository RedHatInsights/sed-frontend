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
        Red Hat connector allows you to register with Red Hat Subscription
        Management (RHSM), connect to Red Hat Insights, and manage your Insights
        connections with one command.
      </Text>
      <Text>
        Red Hat connector connects RHEL 7.9+ and 8.4+ systems. To register other
        systems with RHSM or Insights, check out the&nbsp;
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
