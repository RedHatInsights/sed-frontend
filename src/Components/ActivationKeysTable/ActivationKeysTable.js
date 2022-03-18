import React from 'react';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import useActivationKeys from '../../hooks/useActivationKeys';
import Loading from '../LoadingState/Loading';
import Unavailable from '@redhat-cloud-services/frontend-components/Unavailable';

const ActivationKeysTable = () => {
  const columnNames = {
    name: 'Key Name',
    role: 'Role',
    serviceLevel: 'SLA',
    usage: 'Usage',
  };
  const { isLoading, error, data } = useActivationKeys();

  const Results = () => {
    return (
      <TableComposable aria-label="ActivationKeys">
        <Thead>
          <Tr ouiaSafe={true}>
            <Th>{columnNames.name}</Th>
            <Th>{columnNames.role}</Th>
            <Th>{columnNames.serviceLevel}</Th>
            <Th>{columnNames.usage}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((datum) => (
            <Tr key={datum.name} ouiaSafe={true}>
              <Td dataLabel={columnNames.name}>{datum.name}</Td>
              <Td dataLabel={columnNames.role}>{datum.role}</Td>
              <Td dataLabel={columnNames.serviceLevel}>{datum.serviceLevel}</Td>
              <Td dataLabel={columnNames.usage}>{datum.usage}</Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    );
  };

  if (isLoading && !error) {
    return <Loading />;
  } else if (!isLoading && !error) {
    return <Results />;
  } else {
    return <Unavailable />;
  }
};

export default ActivationKeysTable;
