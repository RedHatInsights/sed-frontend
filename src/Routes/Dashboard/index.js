import {
  Bullseye,
  Button,
  Flex,
  FlexItem,
  Spinner,
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
import React, {
  lazy,
  Suspense,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import { useLocation, useNavigate } from 'react-router-dom';
import pckg from '../../../package.json';
import ConfirmChangesModal from '../../Components/ConfirmChangesModal';
import Services from '../../Components/Services/Services';
import { RegistryContext } from '../../store';
import { useActions } from '../../store/actions';
import connectedSystemsReducer from '../../store/connectedSystems';
import activeStateReducer from '../../store/currStateReducer';
import logReducer from '../../store/logReducer';
import useUser from '../../hooks/useUser';
import './dashboard.scss';

const { routes: paths } = pckg;

const AboutRemoteHostConfigPopover = lazy(() =>
  import(
    /* webpackChunkName: "ConnectSysAboutRemoteHostConfigPopovertemsModal" */ '../../Components/AboutRemoteHostConfigPopover/AboutRemoteHostConfigPopover'
  )
);

const ConnectLog = lazy(() =>
  import(/* webpackChunkName: "ConnectLog" */ '../../Components/ConnectLog')
);

const SamplePage = () => {
  const { updateDocumentTitle } = useChrome();
  updateDocumentTitle?.('Manage Configuration - Remote Host Configuration');
  const navigate = useNavigate();
  const { getRegistry } = useContext(RegistryContext);
  const [confirmChangesOpen, setConfirmChangesOpen] = useState(false);
  const [madeChanges, setMadeChanges] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dataRef = useRef();
  const dispatch = useDispatch();
  const location = useLocation();
  const { fetchConnectedHosts, fetchCurrState, saveCurrState } = useActions();
  const { data: userData } = useUser();

  const activeStateLoaded = useSelector(
    ({ activeStateReducer }) => activeStateReducer?.loaded
  );
  const { compliance, remediations, active } = useSelector(
    ({ activeStateReducer }) => ({
      compliance: activeStateReducer?.values?.compliance,
      remediations: activeStateReducer?.values?.remediations,
      active: activeStateReducer?.values?.active,
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
      logReducer,
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

  const isLogsModalOpen = location.pathname.split('/').pop() === paths.logModal;

  return (
    <React.Fragment>
      {isLogsModalOpen && (
        <Suspense
          fallback={
            <Bullseye>
              <Spinner />
            </Bullseye>
          }
        >
          <ConnectLog />
        </Suspense>
      )}

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
          <SplitItem>
            <Button
              onClick={() => navigate(`./${paths.logModal}`)}
              variant="link"
            >
              View log
            </Button>
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
                'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/remote_host_configuration_and_management/index'
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
          {activeStateLoaded ||
          (compliance !== undefined && remediations !== undefined) ? (
            <Services
              madeChanges={madeChanges}
              setConfirmChangesOpen={setConfirmChangesOpen}
              setMadeChanges={setMadeChanges}
              setIsEditing={setIsEditing}
              isEditing={isEditing}
              defaults={{
                compliance,
                remediations,
                active,
              }}
              onChange={(data) => {
                dataRef.current = data;
              }}
            />
          ) : (
            <Bullseye>
              <Spinner className="pf-v5-u-p-lg" size="xl" />
            </Bullseye>
          )}
        </div>
      </Page>
      <ConfirmChangesModal
        isOpen={confirmChangesOpen}
        handleCancel={() => setConfirmChangesOpen(false)}
        systemsCount={systemsCount}
        data={dataRef.current}
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
            setMadeChanges(false);
            setIsEditing(false);
          })();
        }}
      />
    </React.Fragment>
  );
};

export default SamplePage;
