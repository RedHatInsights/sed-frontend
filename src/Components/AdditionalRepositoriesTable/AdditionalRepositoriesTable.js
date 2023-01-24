import React from 'react';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import propTypes from 'prop-types';
import NoAdditionalRepositories from './NoAdditionalRepositories';

const AdditionalRepositoriesTable = (props) => {
  const { repositories } = props;
  const columnNames = {
    repositoryLabel: 'Label',
    repositoryName: 'Name',
  };

  if (repositories && repositories.length > 0) {
    return (
      <TableComposable aria-label="ActivationKeys">
        <Thead>
          <Tr ouiaSafe={true}>
            <Th width={40}>{columnNames.repositoryName}</Th>
            <Th>{columnNames.repositoryLabel}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {repositories.map((repository) => {
            return (
              <Tr key={repository.repositoryName} ouiaSafe={true}>
                <Td dataLabel={columnNames.repositoryName}>
                  {repository.repositoryName}
                </Td>
                <Td dataLabel={columnNames.repositoryLabel}>
                  {repository.repositoryLabel}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </TableComposable>
    );
  } else {
    return <NoAdditionalRepositories />;
  }
};

AdditionalRepositoriesTable.propTypes = {
  repositories: propTypes.array,
};

export default AdditionalRepositoriesTable;
