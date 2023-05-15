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
import NoAccessPopover from '../NoAccessPopover';
import { useQueryClient } from 'react-query';

const AdditionalRepositoriesTable = (props) => {
  const { repositories, name } = props;
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [activeSortIndex, setActiveSortIndex] = React.useState(null);
  const [activeSortDirection, setActiveSortDirection] = React.useState(null);
  const [repositoryNameToDelete, setRepositoryNameToDelete] =
    React.useState('');
  const [repositoryLabelToDelete, setRepositoryLabelToDelete] =
    React.useState('');
  const [deletedRepositories, setDeletedRepositories] = React.useState([]);
  const columnNames = {
    repositoryLabel: 'Label',
    repositoryName: 'Name',
  };

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');

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

  const sortRepos = (filteredRepositories, sortIndex) => {
    const sortedRepos = filteredRepositories?.sort((a, b) => {
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
      itemCount={countProducts(filteredRepositories)}
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
      itemCount={countProducts(filteredRepositories)}
      perPage={perPage}
      page={page}
      onSetPage={handleSetPage}
      onPerPageSelect={handlePerPageSelect}
      variant={PaginationVariant.bottom}
    />
  );

  const filteredRepositories = repositories.filter((repository) => {
    return !deletedRepositories.some(
      (deletedRepository) =>
        deletedRepository.repositoryName === repository.repositoryName
    );
  });

  const sortedRepositories = sortRepos(filteredRepositories, activeSortIndex);
  const paginatedRepos = getPage(sortedRepositories);

  const [
    isDeleteAdditionalRepositoriesModalOpen,
    setisDeleteAdditionalRepositoriesModalOpen,
  ] = React.useState(false);

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
                  {user.rbacPermissions.canWriteActivationKeys ? (
                    <RemoveAdditionalRepositoriesButton
                      onClick={() =>
                        handleDeleteAdditionalRepositoriesToggle(
                          repository.repositoryName,
                          repository.repositoryLabel
                        )
                      }
                    />
                  ) : (
                    <NoAccessPopover
                      content={RemoveAdditionalRepositoriesButton}
                    />
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
        <DeleteAdditionalRepositoriesModal
          name={name}
          isOpen={isDeleteAdditionalRepositoriesModalOpen}
          handleModalToggle={() =>
            setisDeleteAdditionalRepositoriesModalOpen(false)
          }
          repositoryNameToDelete={repositoryNameToDelete}
          repositoryLabelToDelete={repositoryLabelToDelete}
          setDeletedRepositories={setDeletedRepositories}
        />
      </TableComposable>
      {repositories.length === 0 && <NoAdditionalRepositories />}
      <PaginationBottom />
    </React.Fragment>
  );
};

AdditionalRepositoriesTable.propTypes = {
  repositories: propTypes.array.isRequired,
  name: propTypes.string.isRequired,
  setRepositories: propTypes.func,
};

export default AdditionalRepositoriesTable;
