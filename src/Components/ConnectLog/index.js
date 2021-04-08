import React, { Fragment, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
} from '@patternfly/react-table';
import PropTypes from 'prop-types';
import { Modal } from '@patternfly/react-core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLog } from '../../store/actions';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { SkeletonTable } from '@redhat-cloud-services/frontend-components/SkeletonTable';

const columns = [
  {
    title: 'Initiated date/time',
  },
  'Initiator',
];

const rowsMapper = (results) =>
  results.map(({ account, created_at: createdAt, id }) => ({
    id,
    cells: [
      <Fragment key="date">
        <DateFormat date={new Date(createdAt)} extraTitle="Created at: " />
      </Fragment>,
      account,
    ],
  }));

const ConnectLog = ({ isOpen = false, onClose }) => {
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
          rows={rowsMapper(rows)}
          cells={columns}
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
