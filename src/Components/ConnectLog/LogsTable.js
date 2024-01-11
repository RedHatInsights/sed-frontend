import React, { Fragment, useEffect, useState, useCallback } from 'react';
import {
	TableVariant,
	expandable,
	cellWidth
} from '@patternfly/react-table';
import {
	Table,
	TableHeader,
	TableBody
} from '@patternfly/react-table/deprecated';
import PropTypes from 'prop-types';
import {
  Pagination,
  Skeleton,
  PaginationVariant,
  Button,
} from '@patternfly/react-core';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { SkeletonTable } from '@redhat-cloud-services/frontend-components/SkeletonTable';
import { TableToolbar } from '@redhat-cloud-services/frontend-components/TableToolbar';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import flatMap from 'lodash/flatMap';
import LogNestedTable from './LogNestedtable';
import { downloadFile } from '../../utils/helpers';
import { useActions } from '../../store/actions';
import { useConfigApi } from '../../api';

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

const rowsMapper = (results, opened, onClick) =>
  flatMap(
    results.map(
      (
        {
          account_id,
          created_at: createdAt,
          id,
          compliance,
          remediations,
          insights,
        },
        key
      ) => [
        {
          id,
          isOpen: opened.includes(id),
          cells: [
            <Fragment key="date">
              <DateFormat
                date={new Date(createdAt)}
                extraTitle="Created at: "
              />
            </Fragment>,
            account_id,
            <Fragment key={`download file-${id}`}>
              <Button variant="link" isInline onClick={() => onClick(id)}>
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
                  compliance,
                  remediations,
                }}
                isInsights={insights}
              />
            </Fragment>,
          ],
        },
      ]
    )
  );

const LogsTable = () => {
  const [opened, setOpened] = useState([]);
  const dispatch = useDispatch();
  const { fetchLog } = useActions();
  const configApi = useConfigApi();

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
    dispatch(fetchLog());
  }, []);
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

  const onClick = (id) => {
    (async () => {
      const data = await configApi.getPlaybook(id);
      downloadFile(data);
    })();
  };

  return (
    <Fragment>
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
          rows={rowsMapper(rows, opened, onClick)}
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
    </Fragment>
  );
};

LogsTable.propTypes = {
  isActive: PropTypes.bool,
};

LogsTable.defaultProps = {
  isActive: false,
};

export default LogsTable;
