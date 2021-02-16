import React, { Fragment, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
  expandable,
} from '@patternfly/react-table';
import PropTypes from 'prop-types';
import { Modal } from '@patternfly/react-core';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { InProgressIcon } from '@patternfly/react-icons';
import LogNestedTable from './LogNestedtable';

const columns = [
  {
    title: 'Initiated date/time',
    cellFormatters: [expandable],
  },
  'Initiator',
  'Status',
  'Playbook',
];

const initialRows = [
  {
    isOpen: false,
    cells: [
      <Fragment key="date">
        <DateFormat date={new Date()} type="exact" />
      </Fragment>,
      'John Doe',
      <Fragment key="status">
        <div>
          <InProgressIcon />
          &nbsp; In progress
        </div>
      </Fragment>,
      <Fragment key="download">
        <a href="#">Download</a>
      </Fragment>,
    ],
  },
  {
    parent: 0,
    cells: [
      <Fragment key="nested-table">
        <LogNestedTable />
      </Fragment>,
    ],
  },
  {
    isOpen: false,
    cells: [
      <Fragment key="date">
        <DateFormat date={new Date()} type="exact" />
      </Fragment>,
      'John Doe',
      <Fragment key="status">
        <div>
          <InProgressIcon />
          &nbsp; In progress
        </div>
      </Fragment>,
      <Fragment key="download">
        <a href="#">Download</a>
      </Fragment>,
    ],
  },
  {
    parent: 2,
    cells: [
      <Fragment key="nested-table">
        <LogNestedTable />
      </Fragment>,
    ],
  },
  {
    isOpen: false,
    cells: [
      <Fragment key="date">
        <DateFormat date={new Date()} type="exact" />
      </Fragment>,
      'John Doe',
      <Fragment key="status">
        <div>
          <InProgressIcon />
          &nbsp; In progress
        </div>
      </Fragment>,
      <Fragment key="download">
        <a href="#">Download</a>
      </Fragment>,
    ],
  },
  {
    parent: 4,
    cells: [
      <Fragment key="nested-table">
        <LogNestedTable />
      </Fragment>,
    ],
  },
];

const ConnectLog = ({ isOpen = false, onClose }) => {
  const [rows, setRows] = useState(initialRows);
  const onCollapse = (event, rowKey, isOpen) => {
    setRows((rows) =>
      rows.map((row, index) => (index === rowKey ? { ...row, isOpen } : row))
    );
  };

  return (
    <Modal
      title="Red Hat connect log"
      variant="large"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Table
        aria-label="Logs table"
        variant={TableVariant.compact}
        onCollapse={onCollapse}
        rows={rows}
        cells={columns}
      >
        <TableHeader />
        <TableBody />
      </Table>
    </Modal>
  );
};

ConnectLog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default ConnectLog;
