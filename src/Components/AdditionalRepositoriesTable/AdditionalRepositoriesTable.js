import React, { useState } from 'react';
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
  const { repositories, name } = props;
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [activeSortDirection, setActiveSortDirection] = useState(null);
  const [repositoryNameToDelete, setRepositoryNameToDelete] = useState('');
  const [repositoryLabelToDelete, setRepositoryLabelToDelete] = useState('');
  const [
    isDeleteAdditionalRepositoriesModalOpen,
    setisDeleteAdditionalRepositoriesModalOpen,
  ] = useState(false);
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

  const PaginationTop = () => (
    <Pagination
      itemCount={sortedRepositories?.length}
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
      itemCount={sortedRepositories?.length}
      perPage={perPage}
      page={page}
      onSetPage={handleSetPage}
      onPerPageSelect={handlePerPageSelect}
      variant={PaginationVariant.bottom}
    />
  );

  const sortedRepositories = sortRepos(repositories, activeSortIndex);
  const paginatedRepos = getPage(sortedRepositories);

  const handleDeleteAdditionalRepositoriesToggle = (
    repositoryName,
    repositoryLabel
  ) => {
    setisDeleteAdditionalRepositoriesModalOpen(
      !isDeleteAdditionalRepositoriesModalOpen
    );
    setRepositoryNameToDelete(repositoryName);
    setRepositoryLabelToDelete(repositoryLabel);
  };

  return (
    <React.Fragment>
      <PaginationTop />
      <TableComposable aria-label="ActivationKeys">
        <Thead>
          <Tr>
            <Th sort={getSortParams(0)} width={40}>
              {columnNames.repositoryName}
            </Th>
            <Th sort={getSortParams(1)}>{columnNames.repositoryLabel}</Th>
            <Th />
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
                <RemoveAdditionalRepositoriesButton
                  onClick={() =>
                    handleDeleteAdditionalRepositoriesToggle(
                      repository.repositoryName,
                      repository.repositoryLabel
                    )
                  }
                />
              </Tr>
            );
          })}
        </Tbody>
        <DeleteAdditionalRepositoriesModal
          name={name}
          isOpen={isDeleteAdditionalRepositoriesModalOpen}
          handleModalToggle={handleDeleteAdditionalRepositoriesToggle}
          repositoryNameToDelete={repositoryNameToDelete}
          repositoryLabelToDelete={repositoryLabelToDelete}
        />
      </TableComposable>
      <DeleteAdditionalRepositoriesModal
        name={name}
        isOpen={isDeleteAdditionalRepositoriesModalOpen}
        handleModalToggle={handleDeleteAdditionalRepositoriesToggle}
        repositoryNameToDelete={repositoryNameToDelete}
        repositoryLabelToDelete={repositoryLabelToDelete}
      />
      {repositories.length === 0 && <NoAdditionalRepositories />}
      <PaginationBottom />
    </React.Fragment>
  );
};

AdditionalRepositoriesTable.propTypes = {
  repositories: propTypes.array.isRequired,
  name: propTypes.string.isRequired,
};

export default AdditionalRepositoriesTable;
