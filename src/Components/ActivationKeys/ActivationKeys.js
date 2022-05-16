import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  ActionGroup,
  Text,
  TextContent,
  TextVariants,
  PageSection,
  PageSectionVariants,
  Flex,
  FlexItem,
  Split,
  SplitItem,
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ActivationKeysTable from '../ActivationKeysTable';
import { useQueryClient } from 'react-query';
import NoAccessView from './no-access';
import NoActivationKeysFound from '../EmptyState';
import CreateActivationKeyModal from '../Modals/CreateActivationKeyModal';
import useActivationKeys from '../../hooks/useActivationKeys';
import Loading from '../LoadingState/Loading';
import CreateActivationKeyButton from './CreateActivationKeyButton';
import DeleteActivationKeyConfirmationModal from '../Modals/DeleteActivationKeyConfirmationModal';
import ActivationKeysDocsPopover from '../ActivationKeysDocsPopover';
const ActivationKeys = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const { isLoading, error, data } = useActivationKeys();
  const [isOpen, setisOpen] = useState(false);
  const [currentKeyName, setCurrentKeyName] = useState('');
  const [
    isDeleteActivationKeyModalOpen,
    setIsDeleteActivationKeyModalOpen,
  ] = useState(false);
  const handleModalToggle = () => {
    setisOpen(!isOpen);
  };

  const actions = (activationKeyName) => {
    return [
      {
        title: 'Delete',
        onClick: () => handleDeleteActivationKeyModalToggle(activationKeyName),
      },
    ];
  };
  let pageContent;
  if (isLoading) {
    pageContent = <Loading />;
  } else if (!isLoading && !error && !data.length) {
    pageContent = (
      <NoActivationKeysFound handleModalToggle={handleModalToggle} />
    );
  } else if (!isLoading && !error && data.length) {
    pageContent = (
      <>
        <ActionGroup>
          <CreateActivationKeyButton onClick={handleModalToggle} />
        </ActionGroup>
        <ActivationKeysTable actions={actions} />
      </>
    );
  }
  const handleDeleteActivationKeyModalToggle = (name) => {
    setCurrentKeyName(name);
    setIsDeleteActivationKeyModalOpen(!isDeleteActivationKeyModalOpen);
  };

  const Page = () => {
    return (
      <React.Fragment>
        <PageHeader>
          <Split hasGutter className="page-title">
            <SplitItem isFilled>
              <Flex>
                <FlexItem spacer={{ default: 'spacerSm' }}>
                  <PageHeaderTitle title="Activation Keys" />
                </FlexItem>
                <FlexItem>
                  <ActivationKeysDocsPopover orgId={user.orgId} />
                </FlexItem>
              </Flex>
            </SplitItem>
          </Split>
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
        <DeleteActivationKeyConfirmationModal
          handleModalToggle={handleDeleteActivationKeyModalToggle}
          isOpen={isDeleteActivationKeyModalOpen}
          name={currentKeyName}
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
