import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  ActionGroup,
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
import BlankState from './blank-state';
import CreateActivationKeyModal from '../Modals/CreateActivationKeyModal';
import useActivationKeys from '../../hooks/useActivationKeys';
import Loading from '../LoadingState/Loading';
import CreateActivationKeyButton from './createActivationKeyButton';
const ActivationKeys = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const { isLoading, error, data } = useActivationKeys();
  const [isOpen, setisOpen] = useState(false);
  const handleModalToggle = () => {
    setisOpen(!isOpen);
  };
  let pageContent;
  if (isLoading) {
    pageContent = <Loading />;
  } else if (!isLoading && !error && !data.length) {
    pageContent = <BlankState handleModalToggle={handleModalToggle} />;
  } else if (!isLoading && !error && data.length) {
    pageContent = (
      <>
        <ActionGroup>
          <CreateActivationKeyButton onClick={handleModalToggle} />
        </ActionGroup>
        <ActivationKeysTable />
      </>
    );
  }
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
            {pageContent}
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
