import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Divider,
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
import SampleTabRoute from './SampleTabRoute';
import ConfirmChangesModal from '../../Components/ConfirmChangesModal';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import ConnectLog from '../../Components/ConnectLog';
import activeStateReducer from '../../store/currStateReducer';
import logReducer from '../../store/logReducer';
import { fetchCurrState, saveCurrState } from '../../store/actions';

const SamplePage = () => {
  const [confirmChangesOpen, setConfirmChangesOpen] = useState(false);
  const [logsOpen, setLogsOpen] = useState(false);
  const [madeChanges, setMadeChanges] = useState(false);
  const dataRef = useRef();
  const activeStateLoaded = useSelector(
    ({ activeStateReducer }) => activeStateReducer?.loaded
  );
  const { useOpenSCAP, useAnalysis, enableCloudConnector } = useSelector(
    ({ activeStateReducer }) => ({
      useOpenSCAP: activeStateReducer?.values?.useOpenSCAP,
      useAnalysis: activeStateReducer?.values?.useAnalysis,
      enableCloudConnector: activeStateReducer?.values?.enableCloudConnector,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  useEffect(() => {
    insights?.chrome?.appAction?.('cloud-connector-dashboard');
    getRegistry().register({ activeStateReducer, logReducer });
    dispatch(fetchCurrState());
  }, []);

  return (
    <React.Fragment>
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
                    <Title headingLevel="h3" size="2xl">
                      1032
                    </Title>
                    {!activeStateLoaded &&
                      useOpenSCAP !== undefined &&
                      useAnalysis !== undefined &&
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
                  <a href="#">Connect RHEL 6 and 7 systems</a>
                </LevelItem>
                <LevelItem>
                  <Button
                    ouiaId="primary-save-button"
                    isDisabled={!madeChanges}
                    onClick={() => setConfirmChangesOpen(true)}
                  >
                    Save changes
                  </Button>
                  <Button onClick={() => setLogsOpen(true)} variant="link">
                    View log
                  </Button>
                </LevelItem>
              </Level>
            </StackItem>
          </Stack>
          <Divider />
          {activeStateLoaded ||
          (useOpenSCAP !== undefined &&
            useAnalysis !== undefined &&
            enableCloudConnector !== undefined) ? (
            <SampleTabRoute
              setMadeChanges={setMadeChanges}
              defaults={{
                useOpenSCAP,
                useAnalysis,
                enableCloudConnector,
              }}
              onChange={(data) => {
                dataRef.current = data;
              }}
            />
          ) : (
            <Bullseye>
              <Spinner size="xl" />
            </Bullseye>
          )}
        </div>
      </Main>
      <ConfirmChangesModal
        isOpen={confirmChangesOpen}
        handleCancel={() => setConfirmChangesOpen(false)}
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
      <ConnectLog isOpen={logsOpen} onClose={() => setLogsOpen(false)} />
    </React.Fragment>
  );
};

export default SamplePage;
