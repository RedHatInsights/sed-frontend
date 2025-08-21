import React, { useState } from 'react';
import {
  ActionGroup,
  Content,
  ContentVariants,
  PageSection,
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
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import ActivationKeysTable from '../ActivationKeysTable';
import { useQueryClient } from '@tanstack/react-query';
import NoActivationKeysFound from '../EmptyState';
import EditActivationKeyModal from '../Modals/EditActivationKeyModal';
import CreateActivationKeyWizard from '../Modals/CreateActivationKeyWizard';
import useActivationKeys from '../../hooks/useActivationKeys';
import Loading from '../LoadingState/Loading';
import CreateActivationKeyButton from './CreateActivationKeyButton';
import DeleteActivationKeyConfirmationModal from '../Modals/DeleteActivationKeyConfirmationModal';
import ActivationKeysDocsPopover from '../ActivationKeysDocsPopover';
const ActivationKeys = () => {
  const { updateDocumentTitle } = useChrome();
  updateDocumentTitle?.('Activation Keys - System Configuration | RHEL', true);
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);
  const { isLoading, error, data } = useActivationKeys();
  const [isOpen, setisOpen] = useState(false);
  const [currentKeyName, setCurrentKeyName] = useState('');

  const [isDeleteActivationKeyModalOpen, setIsDeleteActivationKeyModalOpen] =
    useState(false);
  const [isEditActivationKeyModalOpen, setIsEditActivationKeyModalOpen] =
    useState(false);
  const handleModalToggle = () => {
    setisOpen(!isOpen);
  };

  const popoverContent = (
    <Content className="pf-v5-u-font-size-sm">
      <Content component="p">
        Activation keys assist you in registering systems. Metadata such as
        role, system purpose, and usage can be automatically attached to systems
        via an activation key, and monitored with &nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={'https://console.redhat.com/insights/subscriptions/rhel'}
        >
          Subscription Watch.
        </a>
      </Content>
      <Content component="p">
        To register with an activation key, you will need your organization ID:{' '}
        <b>{user.orgId}</b>
      </Content>
    </Content>
  );

  const setKeyName = (modalOpen, name) => {
    let currentName = modalOpen ? '' : name;
    setCurrentKeyName(currentName);
  };

  const handleDeleteActivationKeyModalToggle = (name) => {
    setKeyName(isDeleteActivationKeyModalOpen, name);
    setIsDeleteActivationKeyModalOpen(!isDeleteActivationKeyModalOpen);
  };

  const handleEditActivationKeyModalToggle = (name) => {
    setKeyName(isEditActivationKeyModalOpen, name);
    setIsEditActivationKeyModalOpen(!isEditActivationKeyModalOpen);
  };

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
                <ActivationKeysDocsPopover
                  popoverContent={popoverContent}
                  title="Activation Keys"
                  position="right"
                />
              </FlexItem>
            </Flex>
          </SplitItem>
        </Split>
        <Content>
          <Content component={ContentVariants.p}>
            Organization ID: {user.orgId}
          </Content>
        </Content>
      </PageHeader>
      <Main>
        <PageSection hasBodyWrapper={false}>
          {isLoading && <Loading />}
          {!isLoading && !error && data.length > 0 && (
            <>
              <ActionGroup>
                <CreateActivationKeyButton onClick={handleModalToggle} />
              </ActionGroup>
              <ActivationKeysTable
                onDelete={handleDeleteActivationKeyModalToggle}
              />
            </>
          )}
          {!isLoading && !error && !data.length && (
            <NoActivationKeysFound handleModalToggle={handleModalToggle} />
          )}
        </PageSection>
      </Main>
      <CreateActivationKeyWizard
        key={isOpen}
        isOpen={isOpen}
        handleModalToggle={handleModalToggle}
      />
      <EditActivationKeyModal
        title="Edit activation key"
        isOpen={isEditActivationKeyModalOpen}
        handleModalToggle={handleEditActivationKeyModalToggle}
        activationKeyName={currentKeyName}
        modalSize="large"
      />
      <DeleteActivationKeyConfirmationModal
        handleModalToggle={handleDeleteActivationKeyModalToggle}
        isOpen={isDeleteActivationKeyModalOpen}
        name={currentKeyName}
      />
    </React.Fragment>
  );
};

export default ActivationKeys;
