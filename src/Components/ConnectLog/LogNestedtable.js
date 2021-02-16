import React, { Fragment, useState } from 'react';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import { Pagination } from '@patternfly/react-core';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@patternfly/react-icons';
import {
  Table,
  TableHeader,
  TableBody,
  sortable,
  SortByDirection,
} from '@patternfly/react-table';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';

const columns = [
  { title: 'System', transforms: [sortable] },
  {
    title: 'Last attempt date/time',
    transforms: [sortable],
  },
  { title: 'Status', transforms: [sortable] },
  '',
];

const initialRows = [
  [
    'ipareplica8.example.lab',
    <Fragment key="date">
      <DateFormat date={new Date()} type="exact" />
    </Fragment>,
    <Fragment key={status}>
      <div>
        <CheckCircleIcon color="green" />
        &nbsp; Success
      </div>
    </Fragment>,
    <Fragment key="download">
      <a href="#">Download log</a>
    </Fragment>,
  ],
  [
    'r720.valleedelisle.nat',
    <Fragment key="date">
      <DateFormat date={new Date()} type="exact" />
    </Fragment>,
    <Fragment key={status}>
      <div>
        <ExclamationCircleIcon color="red" />
        &nbsp; Failure - Retried x23
      </div>
    </Fragment>,
    <Fragment key="download">
      <a href="#">Download log</a>
    </Fragment>,
  ],
];

const LogNestedTable = () => {
  const [{ rows, sortBy }, setRows] = useState({
    rows: initialRows,
    sortBy: {},
  });
  const onSort = (_event, index, direction) => {
    setRows(({ rows }) => {
      const newRows = rows.sort((a, b) =>
        a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0
      );
      return {
        sortBy: {
          index,
          direction,
        },
        rows: direction === SortByDirection.asc ? newRows : newRows.reverse(),
      };
    });
  };

  return (
    <div>
      <PrimaryToolbar
        filterConfig={{
          onChange: (_e, value) => console.log({ value }),
          value: 'text',
        }}
        pagination={<Pagination page={1} perPage={20} itemCount={7} />}
      />
      <Table
        aria-label="Sortable Table"
        sortBy={sortBy}
        onSort={onSort}
        cells={columns}
        rows={rows}
        variant="compact"
      >
        <TableHeader />
        <TableBody />
      </Table>
    </div>
  );
};

export default LogNestedTable;
