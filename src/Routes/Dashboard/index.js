import {
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Page,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import React, { lazy, useContext, useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import ConfirmChangesModal from '../../Components/ConfirmChangesModal';
import Services from '../../Components/Services/Services';
import { RegistryContext } from '../../store';
import { useActions } from '../../store/actions';
import connectedSystemsReducer from '../../store/connectedSystems';
import activeStateReducer from '../../store/currStateReducer';
import useUser from '../../hooks/useUser';
import './dashboard.scss';

const AboutRemoteHostConfigPopover = lazy(() =>
  import(
    /* webpackChunkName: "ConnectSysAboutRemoteHostConfigPopovertemsModal" */ '../../Components/AboutRemoteHostConfigPopover/AboutRemoteHostConfigPopover'
  )
);

const SamplePage = () => {
  const { updateDocumentTitle } = useChrome();
  updateDocumentTitle?.(
    'Remote Host Configuration - System Configuration | RHEL',
    true
  );
  const { getRegistry } = useContext(RegistryContext);
  const [confirmChangesOpen, setConfirmChangesOpen] = useState(false);
  const dataRef = useRef();
  const dispatch = useDispatch();
  const { fetchConnectedHosts, fetchCurrState, saveCurrState } = useActions();
  const { data: userData } = useUser();

  const activeStateLoaded = useSelector(
    ({ activeStateReducer }) => activeStateReducer?.loaded
  );
  const { remediations, profileId } = useSelector(
    ({ activeStateReducer }) => ({
      remediations: activeStateReducer?.values?.remediations,
      profileId: activeStateReducer?.values?.id,
    }),
    shallowEqual
  );
  const { systemsCount } = useSelector(
    ({ connectedSystemsReducer }) => ({
      systemsLoaded: connectedSystemsReducer?.loaded,
      systemsCount: connectedSystemsReducer?.total,
    }),
    shallowEqual
  );

  useEffect(() => {
    getRegistry().register({
      activeStateReducer,
      connectedSystemsReducer,
    });
    dispatch(fetchCurrState());
    if (userData.rbacPermissions.canReadInventory) {
      dispatch(fetchConnectedHosts());
    }
  }, [getRegistry, userData]);

  useEffect(() => {
    insights?.chrome?.appAction?.('cloud-connector-dashboard');
  }, []);

  return (
    <React.Fragment>
      <PageHeader className="page-header">
        <Split hasGutter className="page-title">
          <SplitItem isFilled>
            <Flex>
              <FlexItem spacer={{ default: 'spacerSm' }}>
                <PageHeaderTitle title="Remote Host Configuration Manager" />
              </FlexItem>
              <FlexItem>
                <AboutRemoteHostConfigPopover />
              </FlexItem>
            </Flex>
          </SplitItem>
        </Split>
        <Stack hasGutter>
          <StackItem>
            Selections here affect Red Hat Enterprise Linux (RHEL) systems
            connected to Red Hat with remote host configuration (rhc). Upon
            saving changes, Ansible Playbooks are automatically pushed to
            connected systems to update the configuration of the connection to
            Red Hat.
          </StackItem>
          <StackItem>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={
                'https://access.redhat.com/documentation/en-us/red_hat_insights/1-latest/html/remote_host_configuration_and_management/index'
              }
            >
              Connecting with Red Hat
              {<ExternalLinkAltIcon className="pf-v5-u-ml-sm" />}
            </a>
          </StackItem>
        </Stack>
      </PageHeader>
      <Page>
        <div className="dashboard__content">
          <Services
            setConfirmChangesOpen={setConfirmChangesOpen}
            defaults={{ remediations }}
            onChange={(data) => {
              dataRef.current = data;
            }}
            isLoading={!activeStateLoaded}
          />
        </div>
      </Page>
      <ConfirmChangesModal
        isOpen={confirmChangesOpen}
        handleCancel={() => setConfirmChangesOpen(false)}
        systemsCount={systemsCount}
        handleConfirm={() => {
          setConfirmChangesOpen(false);
          (async () => {
            const saveAction = saveCurrState(dataRef.current);
            dispatch(saveAction);
            await saveAction.payload;
            dispatch(
              addNotification({
                variant: 'success',
                title: 'Changes saved',
                description:
                  'Your service enablement changes were applied to connected systems',
              })
            );
          })();
        }}
        profileId={profileId}
      />
    </React.Fragment>
  );
};

export default SamplePage;
