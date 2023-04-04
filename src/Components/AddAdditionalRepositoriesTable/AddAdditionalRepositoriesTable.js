import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStatePrimary,
  Pagination,
  Title,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';
import React, { useEffect, useState } from 'react';
import Loading from '../LoadingState/Loading';
import AddAdditionalRepositoriesToolbar from './AddAdditionalRepositoriesToolbar';
import propTypes from 'prop-types';

const AddAdditionalRepositoriesTable = (props) => {
  const {
    repositories,
    isLoading,
    selectedRepositories,
    setSelectedRepositories,
    isSubmitting,
  } = props;

  if (isLoading) {
    return <Loading />;
  }

  const [filter, setFilter] = useState('');
  const [consideredRepositories, setConsideredRepositories] =
    useState(repositories);
  const [filteredRepositories, setFilteredRepositories] =
    useState(repositories);
  const [paginatedRepositories, setPaginatedRepositories] =
    useState(repositories);
  const [filterBy, setFilterBy] = useState('repositoryName');
  const [onlyShowSelectedRepositories, setOnlyShowSelectedRepositories] =
    useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [activeSortIndex, setActiveSortIndex] = useState(0);
  const [activeSortDirection, setActiveSortDirection] = useState('asc');
  const friendlyNameMap = {
    repositoryName: 'Name',
    repositoryLabel: 'Label',
  };

  useEffect(() => {
    setConsideredRepositories(
      onlyShowSelectedRepositories ? selectedRepositories : repositories
    );
  }, [onlyShowSelectedRepositories]);

  useEffect(() => {
    setFilteredRepositories(
      sortRepositories(
        consideredRepositories.filter((repository) => {
          return repository[filterBy]
            .toLowerCase()
            .includes(filter.toLowerCase());
        })
      )
    );
  }, [
    filter,
    filterBy,
    consideredRepositories,
    activeSortIndex,
    activeSortDirection,
  ]);

  useEffect(() => {
    const first = (page - 1) * perPage;
    const last = first + perPage;
    setPaginatedRepositories(filteredRepositories.slice(first, last));
  }, [page, perPage, filteredRepositories]);

  useEffect(() => {
    setPage(1);
  }, [filteredRepositories]);

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

  const sortRepositories = (repositories) => {
    return repositories.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex] || '';
      const bValue = getSortableRowValues(b)[activeSortIndex] || '';
      let result = 0;

      if (aValue < bValue) {
        result = -1;
      } else if (aValue > bValue) {
        result = 1;
      }

      return activeSortDirection == 'asc' ? result : -1 * result;
    });
  };

  const pagination = (
    <Pagination
      itemCount={filteredRepositories.length}
      perPage={perPage}
      page={page}
      onSetPage={(_, newPage) => setPage(newPage)}
      onPerPageSelect={(_, newPerPage, newPage) => {
        setPerPage(newPerPage);
        setPage(newPage);
      }}
      isCompact
      isDisabled={isSubmitting}
    />
  );

  const emptyState = (
    <EmptyState>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h2">No results found</Title>
      <EmptyStateBody>
        No results match the filter criteria. Clear all filters and try again.
      </EmptyStateBody>
      <EmptyStatePrimary>
        <Button variant="link" onClick={() => setFilter('')}>
          Clear all filters
        </Button>
      </EmptyStatePrimary>
    </EmptyState>
  );

  return (
    <>
      <AddAdditionalRepositoriesToolbar
        friendlyNameMap={friendlyNameMap}
        filter={filter}
        setFilter={setFilter}
        filterBy={filterBy}
        setFilterBy={setFilterBy}
        dropdownSelectisDisabled={isSubmitting}
        selectedOnlyToggleIsDisabled={
          (!onlyShowSelectedRepositories &&
            selectedRepositories.length === 0) ||
          isSubmitting
        }
        searchIsDisabled={repositories.length === 0 || isSubmitting}
        pagination={pagination}
        onlyShowSelectedRepositories={onlyShowSelectedRepositories}
        setOnlyShowSelectedRepositories={setOnlyShowSelectedRepositories}
      />
      <TableComposable variant="compact">
        <Thead>
          <Tr>
            <Th />
            <Th sort={getSortParams(0)}>{friendlyNameMap.repositoryName}</Th>
            <Th sort={getSortParams(1)}>{friendlyNameMap.repositoryLabel}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {paginatedRepositories.map((repository, rowIndex) => (
            <Tr key={repository.repositoryLabel}>
              <Td
                select={{
                  rowIndex,
                  isSelected: selectedRepositories.includes(repository),
                  onSelect: (_, isSelecting) => {
                    if (isSubmitting) {
                      return;
                    }

                    if (isSelecting) {
                      setSelectedRepositories([
                        ...selectedRepositories,
                        repository,
                      ]);
                    } else {
                      setSelectedRepositories(
                        selectedRepositories.filter(
                          (selectedRepository) =>
                            selectedRepository.repositoryLabel !==
                            repository.repositoryLabel
                        )
                      );
                    }
                  },
                }}
              />
              <Td>{repository.repositoryName}</Td>
              <Td>{repository.repositoryLabel}</Td>
            </Tr>
          ))}
          {paginatedRepositories.length === 0 && (
            <Tr>
              <Td colSpan={8}>
                <Bullseye>{emptyState}</Bullseye>
              </Td>
            </Tr>
          )}
        </Tbody>
      </TableComposable>
      {pagination}
    </>
  );
};

AddAdditionalRepositoriesTable.propTypes = {
  repositories: propTypes.array.isRequired,
  isLoading: propTypes.bool.isRequired,
  error: propTypes.bool.isRequired,
  selectedRepositories: propTypes.array.isRequired,
  setSelectedRepositories: propTypes.func.isRequired,
  isSubmitting: propTypes.bool,
};

export default AddAdditionalRepositoriesTable;
