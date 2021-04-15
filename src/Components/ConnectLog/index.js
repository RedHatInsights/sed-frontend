import React, { Fragment, useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
  expandable,
} from '@patternfly/react-table';
import PropTypes from 'prop-types';
import { Modal } from '@patternfly/react-core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLog } from '../../store/actions';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { SkeletonTable } from '@redhat-cloud-services/frontend-components/SkeletonTable';
import flatMap from 'lodash/flatMap';
import LogNestedTable from './LogNestedtable';

const columns = [
  {
    title: 'Initiated date/time',
    cellFormatters: [expandable],
  },
  'Initiator',
  'Playbook',
];

const rowsMapper = (results, opened) =>
  flatMap(
    results.map(({ account, created_at: createdAt, id, state }, key) => [
      {
        id,
        isOpen: opened.includes(id),
        cells: [
          <Fragment key="date">
            <DateFormat date={new Date(createdAt)} extraTitle="Created at: " />
          </Fragment>,
          account,
          {
            title: 'Download',
          },
        ],
      },
      {
        parent: key * 2,
        cells: [
          <Fragment key="nested-table">
            <LogNestedTable
              services={{
                useOpenSCAP: state.compliance_openscap,
                enableCloudConnector: state.remediations,
              }}
              isInsights={state.insights}
            />
          </Fragment>,
        ],
      },
    ])
  );

const ConnectLog = ({ isOpen = false, onClose }) => {
  const [opened, setOpened] = useState([]);
  const dispatch = useDispatch();
  const logLoaded = useSelector(
    ({ logReducer }) => logReducer?.loaded || false
  );
  const rows = useSelector(({ logReducer }) => logReducer?.results || []);
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchLog());
    }
  }, [isOpen]);
  const onCollapse = (event, rowKey, isOpen, { id }) => {
    setOpened(() =>
      isOpen ? [...opened, id] : opened.filter((openId) => openId !== id)
    );
  };

  return (
    <Modal
      title="Red Hat connect log"
      variant="large"
      isOpen={isOpen}
      onClose={onClose}
    >
      {logLoaded ? (
        <Table
          aria-label="Logs table"
          variant={TableVariant.compact}
          rows={rowsMapper(rows, opened)}
          cells={columns}
          onCollapse={onCollapse}
        >
          <TableHeader />
          <TableBody />
        </Table>
      ) : (
        <SkeletonTable colSize={2} rowSize={10} />
      )}
    </Modal>
  );
};

ConnectLog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default ConnectLog;
