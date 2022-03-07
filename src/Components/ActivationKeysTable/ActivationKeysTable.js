import React from 'react';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import { v4 as uuid } from 'uuid';
import useActivationKeys from '../../hooks/useActivationKeys';
import Loading from '../LoadingState/Loading';

const ActivationKeysTable = () => {
  const columnNames = {
    name: 'Key Name',
    role: 'Role',
    sla: 'SLA',
    usage: 'Usage',
  };
  const { isLoading, error, data } = useActivationKeys();

  if (isLoading && !error) {
    return <Loading />;
  } else if (!isLoading && !error) {
    return (
      <TableComposable
        aria-label="ActivationKeys"
        ouiaId={uuid()}
        ouiaSafe={true}
      >
        <Thead>
          <Tr ouiaId={uuid()} ouiaSafe={true}>
            <Th>{columnNames.name}</Th>
            <Th>{columnNames.role}</Th>
            <Th>{columnNames.sla}</Th>
            <Th>{columnNames.usage}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((datum) => (
            <Tr key={datum.name} ouiaId={uuid()} ouiaSafe={true}>
              <Td dataLabel={columnNames.name}>{datum.name}</Td>
              <Td dataLabel={columnNames.role}>{datum.role}</Td>
              <Td dataLabel={columnNames.role}>{datum.serviceLevel}</Td>
              <Td dataLabel={columnNames.role}>{datum.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </TableComposable>
    );
  } else {
    return <h1>Unavailable</h1>;
  }
};

export default ActivationKeysTable;
