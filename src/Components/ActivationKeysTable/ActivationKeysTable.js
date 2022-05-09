import React from 'react';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ActionsColumn,
} from '@patternfly/react-table';
import useActivationKeys from '../../hooks/useActivationKeys';
import Loading from '../LoadingState/Loading';
import Unavailable from '@redhat-cloud-services/frontend-components/Unavailable';
import propTypes from 'prop-types';
import { useQueryClient } from 'react-query';
import { KebabToggle } from '@patternfly/react-core';

const ActivationKeysTable = (props) => {
  const { actions } = props;
  const columnNames = {
    name: 'Key Name',
    role: 'Role',
    serviceLevel: 'SLA',
    usage: 'Usage',
  };
  const { isLoading, error, data } = useActivationKeys();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const isActionsDisabled = () => {
    return !user.rbacPermissions.canWriteActivationKeys;
  };

  const customActionsToggle = (props) => (
    <KebabToggle
      onToggle={props.onToggle}
      isDisabled={props.isDisabled}
      className={props.isDisabled ? 'pf-m-disabled' : ''}
    >
      Actions
    </KebabToggle>
  );

  const Results = () => {
    return (
      <TableComposable aria-label="ActivationKeys">
        <Thead>
          <Tr ouiaSafe={true}>
            <Th>{columnNames.name}</Th>
            <Th>{columnNames.role}</Th>
            <Th>{columnNames.serviceLevel}</Th>
            <Th>{columnNames.usage}</Th>
            <Td></Td>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((datum) => {
            let rowActions = actions(datum.name);
            return (
              <Tr key={datum.name} ouiaSafe={true}>
                <Td dataLabel={columnNames.name}>{datum.name}</Td>
                <Td dataLabel={columnNames.role}>{datum.role}</Td>
                <Td dataLabel={columnNames.serviceLevel}>
                  {datum.serviceLevel}
                </Td>
                <Td dataLabel={columnNames.usage}>{datum.usage}</Td>
                <Td isActionCell>
                  <ActionsColumn
                    items={rowActions}
                    isDisabled={isActionsDisabled()}
                    actionsToggle={customActionsToggle}
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
  actions: propTypes.func,
};

export default ActivationKeysTable;
