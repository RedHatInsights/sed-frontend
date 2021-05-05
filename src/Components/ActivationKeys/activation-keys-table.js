import React, { Fragment, useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  sortable,
} from '@patternfly/react-table';
import {
  Button,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { CopyIcon, ExternalLinkAltIcon } from '@patternfly/react-icons';
import SkeletonTable from '@redhat-cloud-services/frontend-components/SkeletonTable';
import CopyCommand from './copy-command';

const mockGetData = () =>
  new Promise((res) =>
    setTimeout(
      () =>
        res([
          {
            name: 'sample-name-1',
            role: 'Red Hat Linux Server',
            level: 'Premium',
            usage: 'Production',
          },
          {
            name: 'sample-name-2',
            role: 'Red Hat Linux Workstation',
            level: 'Standard',
            usage: 'Development/Test',
          },
          {
            name: 'sample-name-3',
            role: 'Red Hat Linux Compute Node',
            level: 'Self-Suport',
            usage: 'Disaster Recovery',
          },
        ]),
      250
    )
  );

const columns = [
  { title: 'Name', transforms: [sortable] },
  { title: 'Role', transforms: [sortable] },
  { title: 'Service level', transforms: [sortable] },
  { title: 'Usage', transforms: [sortable] },
  { title: '' },
];

function ActivationKeysTable() {
  const [data, setData] = useState(undefined);
  const [orgId, setOrgId] = useState(undefined);
  const [sortBy, setSortBy] = useState({ index: 0, direction: 'asc' });

  const handleTableButtonClick = (name, data) => {
    const row = data.find((row) => row.name === name);
    const elem = document.createElement('input');
    elem.id = `temp-${name}`;
    elem.type = 'text';
    elem.value = JSON.stringify(row);
    document.body.appendChild(elem);
    document.getElementById(`temp-${name}`).select();
    document.execCommand('copy');
    document.body.removeChild(elem);
  };

  useEffect(() => {
    window.insights.chrome.auth
      .getUser()
      .then((user) => setOrgId(user?.identity?.internal?.org_id));
    mockGetData().then((data) =>
      setData(
        data.map(({ name, role, level, usage }) => [
          name,
          role,
          level,
          usage,
          <Fragment key="copy">
            <Button
              onClick={() => handleTableButtonClick(name, data)}
              variant="plain"
              aria-label="copy"
            >
              <CopyIcon />
            </Button>
          </Fragment>,
        ])
      )
    );
  }, []);

  const onSort = (_event, index, direction) => {
    setSortBy({ index, direction });
    setData((prev) => {
      const rows = prev.sort((a, b) => a[index].localeCompare(b[index]));
      return direction === 'asc' ? [...rows] : [...rows.reverse()];
    });
  };

  return (
    <div className="pf-u-p-lg">
      {!data ? (
        <SkeletonTable rows={5} columns={5} />
      ) : (
        <Fragment>
          <Flex
            alignItems={{ default: 'alignItemsBaseline' }}
            className="pf-u-mb-lg"
          >
            <FlexItem className="pf-u-mr-md">
              <Title headingLevel="h2" size="2xl">
                Activation keys
              </Title>
            </FlexItem>
            <FlexItem>
              <a href="#">
                Manage activation keys <ExternalLinkAltIcon />
              </a>
            </FlexItem>
          </Flex>
          <TextContent>
            <Text>
              Use activation keys to associate your system with a subscription
              when registering with Red Hat connect (rhc).
            </Text>
          </TextContent>
          <Grid>
            <GridItem sm={12} md={6} lg={4}>
              <CopyCommand />
            </GridItem>
          </Grid>
          <Title className="pf-u-mt-lg" size="xl" headingLevel="h3">
            Activation keys
          </Title>
          <TextContent className="pf-u-mb-lg">
            <Text>Organization ID: {orgId}</Text>
          </TextContent>
          <Table
            aria-label="activation keys table"
            sortBy={sortBy}
            onSort={onSort}
            variant="compact"
            cells={columns}
            rows={data}
          >
            <TableHeader />
            <TableBody />
          </Table>
        </Fragment>
      )}
    </div>
  );
}

export default ActivationKeysTable;
