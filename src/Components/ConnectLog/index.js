import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Tab, TabTitleText } from '@patternfly/react-core';
import LogsTable from './LogsTable';
import SystemsTable from './SystemsTable';
import { useHistory } from 'react-router-dom';
import pckg from '../../../package.json';
import { useDispatch } from 'react-redux';
import { clearNotifications } from '@redhat-cloud-services/frontend-components-notifications/redux';
const { routes: paths } = pckg;

const tabMapper = ['runs', 'systems'];

const ConnectLog = () => {
  const [activeTabKey, setActiveTabKey] = useState(0);
  const dispatch = useDispatch();
  const { push, location } = useHistory();
  useEffect(() => {
    dispatch(clearNotifications());
    const searchParams = new URLSearchParams(location.search);
    const activeTab = tabMapper.findIndex(
      (item) => item === searchParams.get('active_tab')
    );
    if (activeTab !== -1) {
      setActiveTabKey(activeTab);
    } else {
      push({
        pathname: location.pathname,
        search: new URLSearchParams({
          active_tab: tabMapper[0],
        }).toString(),
      });
    }
  }, []);
  return (
    <Modal
      title="Red Hat connect log"
      variant="medium"
      isOpen={true}
      onClose={() => push(paths.connector)}
    >
      <Tabs
        activeKey={activeTabKey}
        onSelect={(_e, tabKey) => {
          push({
            pathname: location.pathname,
            search: new URLSearchParams({
              active_tab: tabMapper[tabKey],
            }).toString(),
          });
          setActiveTabKey(tabKey);
        }}
      >
        <Tab eventKey={0} title={<TabTitleText>Runs</TabTitleText>}>
          <LogsTable />
        </Tab>
        <Tab eventKey={1} title={<TabTitleText>Systems</TabTitleText>}>
          <SystemsTable />
        </Tab>
      </Tabs>
    </Modal>
  );
};

export default ConnectLog;
