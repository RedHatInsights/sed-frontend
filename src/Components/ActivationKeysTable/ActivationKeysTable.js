import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
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
import useFeatureFlag from '../../hooks/useFeatureFlag';

const CustomActionsToggle = (props) => (
  <KebabToggle
    onToggle={props.onToggle}
    isDisabled={props.isDisabled}
    className={props.isDisabled ? 'pf-m-disabled' : ''}
  >
    Actions
  </KebabToggle>
);

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
  const { url } = useRouteMatch();

  const keyDetailsIsEnabled = useFeatureFlag(
    'sed-frontend.activationKeysDetailsPage'
  );
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
            let rowActions = actions(datum.name);
            return (
              <Tr key={datum.name} ouiaSafe={true}>
                <Td modifier="breakWord" dataLabel={columnNames.name}>
                  {keyDetailsIsEnabled ? (
                    <Link to={`${url}/${datum.name}`}> {datum.name}</Link>
                  ) : (
                    datum.name
                  )}
                </Td>
                <Td dataLabel={columnNames.role}>{datum.role}</Td>
                <Td dataLabel={columnNames.serviceLevel}>
                  {datum.serviceLevel}
                </Td>
                <Td dataLabel={columnNames.usage}>{datum.usage}</Td>
                <Td isActionCell>
                  <ActionsColumn
                    items={rowActions}
                    isDisabled={isActionsDisabled()}
                    actionsToggle={CustomActionsToggle}
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

CustomActionsToggle.propTypes = {
  onToggle: propTypes.func,
  isDisabled: propTypes.bool,
};

export default ActivationKeysTable;
