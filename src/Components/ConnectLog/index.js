import React, { useEffect, useState } from 'react';
import { Modal, Tabs, Tab, TabTitleText } from '@patternfly/react-core';
import LogsTable from './LogsTable';
import SystemsTable from './SystemsTable';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useNavigate from '@redhat-cloud-services/frontend-components-utilities/useInsightsNavigate';
import { clearNotifications } from '@redhat-cloud-services/frontend-components-notifications/redux';

const tabMapper = ['runs', 'systems'];

const ConnectLog = () => {
  const [activeTabKey, setActiveTabKey] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(clearNotifications());
    const searchParams = new URLSearchParams(location.search);
    const activeTab = tabMapper.findIndex(
      (item) => item === searchParams.get('active_tab')
    );
    if (activeTab !== -1) {
      setActiveTabKey(activeTab);
    } else {
      navigate(
        `?${new URLSearchParams({
          active_tab: tabMapper[0],
        }).toString()}`
      );
    }
  }, []);
  return (
    <Modal
      title="Red Hat connect log"
      variant="medium"
      isOpen={true}
      onClose={() => navigate('/')}
    >
      <Tabs
        activeKey={activeTabKey}
        onSelect={(_e, tabKey) => {
          navigate(
            `?${new URLSearchParams({
              active_tab: tabMapper[tabKey],
            }).toString()}`
          );
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
