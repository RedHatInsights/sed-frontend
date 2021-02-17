import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';

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
} from '@patternfly/react-core';
import {
  OutlinedQuestionCircleIcon,
  InProgressIcon,
} from '@patternfly/react-icons';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';

import './dashboard.scss';
import NavTabs from '../../Components/NavTabs';
import SampleTabRoute from './SampleTabRoute';
import ConfirmChangesModal from '../../Components/ConfirmChangesModal';
import { useDispatch } from 'react-redux';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';
import ConnectLog from '../../Components/ConnectLog';

const tabItems = [
  {
    eventKey: 0,
    pathname: '/red-hat-insights',
    title: (
      <Level hasGutter className="dashboard__navtab-title">
        <LevelItem>Red Hat Insights</LevelItem>
        <LevelItem>
          <Text component="b">
            <span className="dashboard__success-status">ON</span>
          </Text>
        </LevelItem>
      </Level>
    ),
  },
  {
    eventKey: 1,
    pathname: '/red-hat-subscription-manager',
    title: (
      <Level hasGutter className="dashboard__navtab-title">
        <LevelItem>Red Hat Subscription manager</LevelItem>
        <LevelItem>
          <Text component="b">
            <span className="dashboard__success-status">ON</span>
          </Text>
        </LevelItem>
      </Level>
    ),
  },
];

const SamplePage = () => {
  const [confirmChangesOpen, setConfirmChangesOpen] = useState(false);
  const [logsOpen, setLogsOpen] = useState(false);
  const [wasConfirmed, setWasConfirmed] = useState(false);
  const [madeChanges, setMadeChanges] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    insights?.chrome?.appAction?.('sample-page');
  }, []);
  useEffect(() => {
    let listener;
    if (wasConfirmed) {
      listener = setTimeout(() => {
        setWasConfirmed(false);
      }, 5000);
    }
    return () => {
      clearTimeout(listener);
    };
  }, [wasConfirmed]);

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
                    {wasConfirmed && (
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
          <div className="dashboard__tabs-content">
            <NavTabs
              tabItems={tabItems}
              TabsProps={{
                isVertical: true,
                className: 'dashboard__tabs-nav pf-u-mr-lg',
              }}
            />
            <Switch>
              <Route path={tabItems[1].pathname}>
                <div>No component yet</div>
              </Route>
              <Route path={['/', tabItems[0].pathname]}>
                <SampleTabRoute setMadeChanges={setMadeChanges} />
              </Route>
            </Switch>
          </div>
        </div>
      </Main>
      <ConfirmChangesModal
        isOpen={confirmChangesOpen}
        handleCancel={() => setConfirmChangesOpen(false)}
        handleConfirm={() => {
          setWasConfirmed(true);
          setConfirmChangesOpen(false);
          dispatch(
            addNotification({
              variant: 'success',
              title: 'Changes saved',
              description:
                'Your service enablement changes are being applied to connected systems',
            })
          );
        }}
      />
      <ConnectLog isOpen={logsOpen} onClose={() => setLogsOpen(false)} />
    </React.Fragment>
  );
};

export default SamplePage;
