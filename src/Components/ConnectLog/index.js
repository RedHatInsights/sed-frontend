import React, { Fragment, useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableVariant,
  expandable,
  cellWidth,
} from '@patternfly/react-table';
import PropTypes from 'prop-types';
import {
  Modal,
  Pagination,
  Skeleton,
  PaginationVariant,
  Button,
} from '@patternfly/react-core';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { fetchLog } from '../../store/actions';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { SkeletonTable } from '@redhat-cloud-services/frontend-components/SkeletonTable';
import { TableToolbar } from '@redhat-cloud-services/frontend-components/TableToolbar';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import flatMap from 'lodash/flatMap';
import LogNestedTable from './LogNestedtable';
import { downloadFile } from '../../utils/helpers';
import { configApi } from '../../api';

const columns = [
  {
    title: 'Initiated date/time',
    cellFormatters: [expandable],
  },
  'Initiator',
  {
    title: 'Playbook',
    transforms: [cellWidth(20)],
  },
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
          <Fragment key={`download file-${id}`}>
            <Button
              variant="link"
              isInline
              onClick={() => {
                (async () => {
                  const data = await configApi.getPlaybookById(id);
                  downloadFile(data);
                })();
              }}
            >
              Download
            </Button>
          </Fragment>,
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
  const pagination = useSelector(
    ({ logReducer }) => ({
      itemCount: logReducer?.total,
      perPage: logReducer?.limit,
      page:
        Math.floor((logReducer?.offset || 0) / (logReducer?.limit || 0)) + 1,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (isOpen) {
      dispatch(fetchLog({}));
    }
  }, [isOpen]);
  const onCollapse = (_e, _key, isOpen, { id }) => {
    setOpened(() =>
      isOpen ? [...opened, id] : opened.filter((openId) => openId !== id)
    );
  };

  const setPage = useCallback(
    (_e, pageNumber) =>
      dispatch(fetchLog({ page: pageNumber, perPage: pagination.perPage })),
    [dispatch, pagination.perPage]
  );

  const setPerPage = useCallback(
    (_e, perPage) => dispatch(fetchLog({ page: 1, perPage })),
    [dispatch]
  );

  return (
    <Modal
      title="Red Hat connect log"
      variant="medium"
      isOpen={isOpen}
      onClose={onClose}
    >
      <PrimaryToolbar
        pagination={
          logLoaded ? (
            {
              ...pagination,
              onSetPage: setPage,
              onPerPageSelect: setPerPage,
            }
          ) : (
            <Skeleton width="33%" />
          )
        }
      />
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
        <SkeletonTable colSize={3} rowSize={10} />
      )}
      <TableToolbar isFooter>
        {logLoaded ? (
          <Pagination
            {...pagination}
            variant={PaginationVariant.bottom}
            onSetPage={setPage}
            onPerPageSelect={setPerPage}
          />
        ) : (
          <Skeleton width="33%" />
        )}
      </TableToolbar>
    </Modal>
  );
};

ConnectLog.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default ConnectLog;
