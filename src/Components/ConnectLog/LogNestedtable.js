import React from 'react';
import {
  Stack,
  StackItem,
  TextContent,
  Text,
  TextVariants,
} from '@patternfly/react-core';
import PropTypes from 'prop-types';
import {
	Table,
	TableHeader,
	TableBody
} from '@patternfly/react-table/deprecated';

const columns = [
  { title: 'Service' },
  {
    title: 'State',
  },
];

const rowMapper = {
  compliance: 'Use OpenSCAP for Compliance policies',
  remediations: 'Enable Cloud Connector to fix issues directly from Insights',
};

const LogNestedTable = ({ services, isInsights }) => {
  return (
    <Stack>
      <StackItem>
        <TextContent>
          <Text component={TextVariants.h3}>State pushed to systems</Text>
        </TextContent>
      </StackItem>
      <Table
        aria-label="Active services Table"
        className="sed-c-services__table"
        cells={columns}
        rows={[
          {
            noPadding: true,
            cells: [
              'Connected to Red Hat Insighsts',
              isInsights ? 'on' : 'off',
            ],
          },
          ...Object.entries(services).map(([key, value]) => [
            rowMapper[key],
            value === 'enabled' ? 'on' : 'off',
          ]),
        ]}
        variant="compact"
      >
        <TableHeader />
        <TableBody />
      </Table>
    </Stack>
  );
};

LogNestedTable.propTypes = {
  services: PropTypes.shape({
    compliance: PropTypes.bool,
    remediations: PropTypes.bool,
  }).isRequired,
  isInsights: PropTypes.bool.isRequired,
};

export default LogNestedTable;
