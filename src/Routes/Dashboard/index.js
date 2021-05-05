import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  lazy,
  Fragment,
} from 'react';
import {
  Button,
  Flex,
  Level,
  LevelItem,
  Popover,
  Stack,
  StackItem,
  Text,
  Title,
  Spinner,
  Bullseye,
  Skeleton,
  Tabs,
  Tab,
  TabTitleText,
} from '@patternfly/react-core';
import {
  OutlinedQuestionCircleIcon,
  InProgressIcon,
} from '@patternfly/react-icons';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { getRegistry } from '@redhat-cloud-services/frontend-components-utilities/Registry';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';

import './dashboard.scss';
import ConfirmChangesModal from '../../Components/ConfirmChangesModal';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import activeStateReducer from '../../store/currStateReducer';
import logReducer from '../../store/logReducer';
import connectedSystemsReducer from '../../store/connectedSystems';
import {
  fetchCurrState,
  saveCurrState,
  fetchConnectedHosts,
} from '../../store/actions';
import { Link, Route } from 'react-router-dom';
import pckg from '../../../package.json';
import NoSystemsAlert from '../../Components/NoSytemsAlert';
import ActivationKeys from '../../Components/ActivationKeys';
import Services from '../../Components/Services/Services';

const { routes: paths } = pckg;

const ConnectSystemsModal = lazy(() =>
  import(
    /* webpackChunkName: "ConnectSystemsModal" */ '../../Components/ConnectSystemsModal/ConnectSystemsModal'
  )
);

const ConnectLog = lazy(() =>
  import(/* webpackChunkName: "ConnectLog" */ '../../Components/ConnectLog')
);

const SamplePage = () => {
  const [activeTabKey, setActiveTabKey] = useState('services');
  const [confirmChangesOpen, setConfirmChangesOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(true);
  const [madeChanges, setMadeChanges] = useState(false);
  const dataRef = useRef();
  const activeStateLoaded = useSelector(
    ({ activeStateReducer }) => activeStateReducer?.loaded
  );
  const { useOpenSCAP, enableCloudConnector, hasInsights } = useSelector(
    ({ activeStateReducer }) => ({
      useOpenSCAP: activeStateReducer?.values?.useOpenSCAP,
      enableCloudConnector: activeStateReducer?.values?.enableCloudConnector,
      hasInsights: activeStateReducer?.values?.hasInsights,
    }),
    shallowEqual
  );
  const { systemsLoaded, systemsCount } = useSelector(
    ({ connectedSystemsReducer }) => ({
      systemsLoaded: connectedSystemsReducer?.loaded,
      systemsCount: connectedSystemsReducer?.total,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    insights?.chrome?.appAction?.('cloud-connector-dashboard');
    getRegistry().register({
      activeStateReducer,
      logReducer,
      connectedSystemsReducer,
    });
    dispatch(fetchCurrState());
    dispatch(fetchConnectedHosts());
  }, []);

  return (
    <React.Fragment>
      <Route
        exact
        path={paths.connectSystemsModal}
        render={() => (
          <Suspense
            fallback={
              <Bullseye>
                <Spinner />
              </Bullseye>
            }
          >
            <ConnectSystemsModal />
          </Suspense>
        )}
      />
      <Route
        exact
        path={paths.logModal}
        render={() => (
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
      />
      <PageHeader>
        <PageHeaderTitle
          title={
            <div className="dashboard__header">
              Red Hat Connect Dashboard&nbsp;
              <Popover
                aria-label="connected-dashboard-description"
                headerContent={<div>Desc header</div>}
                bodyContent={<p>Popover description</p>}
                position="bottom"
              >
                <Button variant="plain" className="pf-u-p-xs">
                  <OutlinedQuestionCircleIcon color="grey" />
                </Button>
              </Popover>
            </div>
          }
        />
      </PageHeader>
      <Main>
        <Fragment>
          {systemsLoaded && systemsCount === 0 && isGuideOpen && (
            <NoSystemsAlert handleClose={() => setIsGuideOpen(false)} />
          )}
        </Fragment>
        <div className="dashboard__content">
          <Stack className="pf-u-p-md">
            <StackItem>
              <Level>
                <LevelItem>
                  <Title headingLevel="h3" size="md">
                    RHEL 8 systems connected
                  </Title>
                  <Flex
                    alignContent={{ default: 'alignContentCenter' }}
                    alignItems={{ default: 'alignItemsCenter' }}
                  >
                    {systemsLoaded ? (
                      <Title headingLevel="h3" size="2xl">
                        {systemsCount}
                      </Title>
                    ) : (
                      <Skeleton width="33%" />
                    )}

                    {!activeStateLoaded &&
                      useOpenSCAP !== undefined &&
                      enableCloudConnector !== undefined && (
                        <Text
                          className="dashboard__in-progress-text"
                          component="small"
                        >
                          <InProgressIcon />
                          &nbsp;Changes being applied
                        </Text>
                      )}
                  </Flex>
                  <Link to={paths.connectSystemsModal}>
                    Connect RHEL 6 and 7 systems
                  </Link>
                </LevelItem>
              </Level>
            </StackItem>
          </Stack>
          <Tabs
            activeKey={activeTabKey}
            onSelect={(_event, activeTabKey) => setActiveTabKey(activeTabKey)}
          >
            <Tab
              title={<TabTitleText>Services</TabTitleText>}
              eventKey="services"
            >
              {activeStateLoaded ||
              (useOpenSCAP !== undefined &&
                enableCloudConnector !== undefined) ? (
                <Services
                  madeChanges={madeChanges}
                  setConfirmChangesOpen={setConfirmChangesOpen}
                  setMadeChanges={setMadeChanges}
                  defaults={{
                    useOpenSCAP,
                    enableCloudConnector,
                    hasInsights,
                  }}
                  onChange={(data) => {
                    dataRef.current = data;
                  }}
                />
              ) : (
                <Bullseye>
                  <Spinner className="pf-u-p-lg" size="xl" />
                </Bullseye>
              )}
            </Tab>
            <Tab
              eventKey="activation-keys"
              title={<TabTitleText>Activation keys</TabTitleText>}
            >
              <div className="pf-u-m-md">
                <ActivationKeys />
              </div>
            </Tab>
          </Tabs>
        </div>
      </Main>
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
            setMadeChanges(false);
          })();
        }}
      />
    </React.Fragment>
  );
};

export default SamplePage;
