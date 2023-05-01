import React from 'react';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import { Pagination, PaginationVariant } from '@patternfly/react-core';
import propTypes from 'prop-types';
import RemoveAdditionalRepositoriesButton from './RemoveAdditionalRepositoriesButton';
import NoAdditionalRepositories from './NoAdditionalRepositories';
import DeleteAdditionalRepositoriesModal from '../Modals/DeleteAdditionalRepositoriesModal';

const AdditionalRepositoriesTable = (props) => {
  const { repositories } = props;
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [activeSortIndex, setActiveSortIndex] = React.useState(null);
  const [activeSortDirection, setActiveSortDirection] = React.useState(null);
  const columnNames = {
    repositoryLabel: 'Label',
    repositoryName: 'Name',
  };

  const getSortableRowValues = (repo) => {
    const { repositoryName, repositoryLabel } = repo;
    return [repositoryName, repositoryLabel];
  };

  const getSortParams = (columnIndex) => ({
    sortBy: {
      index: activeSortIndex,
      direction: activeSortDirection,
      defaultDirection: 'asc',
    },
    onSort: (_event, index, direction) => {
      setActiveSortIndex(index);
      setActiveSortDirection(direction);
    },
    columnIndex,
  });

  const sortRepos = (repositories, sortIndex) => {
    const sortedRepos = repositories?.sort((a, b) => {
      const aValue = getSortableRowValues(a)[sortIndex] || '';
      const bValue = getSortableRowValues(b)[sortIndex] || '';
      let result = 0;
      if (aValue < bValue) {
        result = -1;
      } else if (aValue > bValue) {
        result = 1;
      }
      return activeSortDirection == 'asc' ? result : -1 * result;
    });
    return sortedRepos;
  };

  const getPage = (repo) => {
    const first = (page - 1) * perPage;
    const last = first + perPage;
    return repo?.slice(first, last);
  };

  const handleSetPage = (_event, page) => {
    setPage(page);
  };

  const handlePerPageSelect = (_event, perPage) => {
    setPerPage(perPage);
    setPage(1);
  };

  const countProducts = () => {
    const filtedRepo = sortedRepositories;
    return filtedRepo?.length;
  };

  const PaginationTop = () => (
    <Pagination
      itemCount={countProducts(repositories)}
      perPage={perPage}
      page={page}
      onSetPage={handleSetPage}
      onPerPageSelect={handlePerPageSelect}
      variant={PaginationVariant.top}
      isCompact
    />
  );

  const PaginationBottom = () => (
    <Pagination
      itemCount={countProducts(repositories)}
      perPage={perPage}
      page={page}
      onSetPage={handleSetPage}
      onPerPageSelect={handlePerPageSelect}
      variant={PaginationVariant.bottom}
    />
  );

  const sortedRepositories = sortRepos(repositories, activeSortIndex);
  const paginatedRepos = getPage(sortedRepositories);

  const [
    isDeleteAdditionalRepositoriesModalOpen,
    setisDeleteAdditionalRepositoriesModalOpen,
  ] = React.useState(false);

  const handleDeleteAdditionalRepositoriesToggle = () => {
    setisDeleteAdditionalRepositoriesModalOpen(
      !isDeleteAdditionalRepositoriesModalOpen
    );
  };

  return (
    <React.Fragment>
      <PaginationTop />
      <TableComposable aria-label="ActivationKeys">
        <Thead>
          <Tr ouiaSafe={true}>
            <Th sort={getSortParams(0)} width={40}>
              {columnNames.repositoryName}
            </Th>
            <Th sort={getSortParams(1)}>{columnNames.repositoryLabel}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedRepos?.map((repository, rowIndex) => {
            return (
              <Tr key={rowIndex} ouiaSafe={true}>
                <Td dataLabel={columnNames.repositoryName}>
                  {repository.repositoryName}
                </Td>
                <Td dataLabel={columnNames.repositoryLabel}>
                  {repository.repositoryLabel}
                </Td>
                <Td>
                  <RemoveAdditionalRepositoriesButton
                    onClick={handleDeleteAdditionalRepositoriesToggle}
                  />
                  <DeleteAdditionalRepositoriesModal
                    isOpen={isDeleteAdditionalRepositoriesModalOpen}
                    handleModalToggle={handleDeleteAdditionalRepositoriesToggle}
                  />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </TableComposable>
      {repositories.length === 0 && <NoAdditionalRepositories />}
      <PaginationBottom />
    </React.Fragment>
  );
};

AdditionalRepositoriesTable.propTypes = {
  repositories: propTypes.array,
};

export default AdditionalRepositoriesTable;
