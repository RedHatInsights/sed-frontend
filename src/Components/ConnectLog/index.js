import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Tabs, Tab, TabTitleText } from '@patternfly/react-core';
import LogsTable from './LogsTable';
import SystemsTable from './SystemsTable';
const ConnectLog = ({ isOpen = false, onClose }) => {
  const [activeTabKey, setActiveTabKey] = useState(0);
  return (
    <Modal
      title="Red Hat connect log"
      variant="medium"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Tabs
        activeKey={activeTabKey}
        onSelect={(_e, tabKey) => setActiveTabKey(tabKey)}
      >
        <Tab eventKey={0} title={<TabTitleText>Runs</TabTitleText>}>
          {isOpen && <LogsTable />}
        </Tab>
        <Tab eventKey={1} title={<TabTitleText>Systems</TabTitleText>}>
          {isOpen && <SystemsTable />}
        </Tab>
      </Tabs>
    </Modal>
  );
};

ConnectLog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default ConnectLog;
