import React from 'react';
import { Link, useLocation } from 'react-router-dom';
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
import DeleteActivationKeyButton from '../ActivationKeys/DeleteActivationKeyButton';
import PropTypes from 'prop-types';

const ActivationKeysTable = (props) => {
  const { onDelete } = props;
  const columnNames = {
    name: 'Key Name',
    role: 'Role',
    serviceLevel: 'SLA',
    usage: 'Usage',
  };
  const { isLoading, error, data } = useActivationKeys();
  const location = useLocation();

  const Results = () => {
    return (
      <TableComposable aria-label="ActivationKeys">
        <Thead>
          <Tr ouiaSafe={true}>
            <Th width={40}>{columnNames.name}</Th>
            <Th>{columnNames.role}</Th>
            <Th>{columnNames.serviceLevel}</Th>
            <Th>{columnNames.usage}</Th>
            <Td></Td>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((datum) => {
            return (
              <Tr key={datum.name} ouiaSafe={true}>
                <Td modifier="breakWord" dataLabel={columnNames.name}>
                  <Link to={`${location.pathname}/${datum.name}`}>
                    {' '}
                    {datum.name}
                  </Link>
                </Td>
                <Td dataLabel={columnNames.role}>{datum.role}</Td>
                <Td dataLabel={columnNames.serviceLevel}>
                  {datum.serviceLevel}
                </Td>
                <Td dataLabel={columnNames.usage}>{datum.usage}</Td>
                <Td>
                  <DeleteActivationKeyButton
                    onClick={() => onDelete(datum.name)}
                  />
                </Td>
              </Tr>
            );
          })}
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

ActivationKeysTable.propTypes = {
  onDelete: PropTypes.func.isRequired,
};

export default ActivationKeysTable;
