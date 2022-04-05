import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  ActionGroup,
  Button,
  Text,
  TextContent,
  TextVariants,
  PageSection,
  PageSectionVariants,
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ActivationKeysTable from '../ActivationKeysTable';
import { useQueryClient } from 'react-query';
import NoAccessView from './no-access';
import CreateActivationKeyModal from '../Modals/CreateActivationKey';
const ActivationKeys = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const [isOpen, setisOpen] = useState(false);
  const handleModalToggle = () => {
    setisOpen(!isOpen);
  };
  const Page = () => {
    return (
      <React.Fragment>
        <PageHeader>
          <PageHeaderTitle title="Activation Keys" />
          <TextContent>
            <Text component={TextVariants.p}>
              Organization ID: {user.orgId}
            </Text>
          </TextContent>
        </PageHeader>
        <Main>
          <PageSection variant={PageSectionVariants.light}>
            <ActionGroup>
              <Button variant="primary" onClick={handleModalToggle}>
                Create Activation Key
              </Button>
            </ActionGroup>
            <ActivationKeysTable />
          </PageSection>
        </Main>
        <CreateActivationKeyModal
          isOpen={isOpen}
          handleModalToggle={handleModalToggle}
        />
      </React.Fragment>
    );
  };

  if (user.rbacPermissions.canReadActivationKeys) {
    return <Page />;
  } else {
    return <NoAccessView />;
  }
};

export default withRouter(ActivationKeys);
