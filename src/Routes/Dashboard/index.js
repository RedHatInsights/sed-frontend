import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import {
  Button,
  Divider,
  Level,
  LevelItem,
  Popover,
  Stack,
  StackItem,
  Text,
  Title,
} from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';

import './dashboard.scss';
import NavTabs from '../../Components/NavTabs';
import SampleTabRoute from './SampleTabRoute';

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
  useEffect(() => {
    insights?.chrome?.appAction?.('sample-page');
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
                  <Title headingLevel="h3" size="2xl">
                    1032
                  </Title>
                  <a href="#">
                    Connect RHEL 6 and 7 systems (link does not work)
                  </a>
                </LevelItem>
                <LevelItem>
                  <Button>Save changes</Button>
                  <Button variant="link">
                    <a href="#">View log</a>
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
                <SampleTabRoute />
              </Route>
            </Switch>
          </div>
        </div>
      </Main>
    </React.Fragment>
  );
};

export default SamplePage;
