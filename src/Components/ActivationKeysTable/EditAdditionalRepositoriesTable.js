import {
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  TableComposable,
} from '@patternfly/react-table';
import propTypes from 'prop-types';
import React from 'react';
import {
  Button,
  Bullseye,
  Pagination,
  EmptyState,
  EmptyStateIcon,
  EmptyStatePrimary,
  EmptyStateBody,
  Title,
  SearchIcon,
} from '@patternfly/react-core';

const EditAdditionalRepositoriesTable = (props) => {
  const { repositories } = props;

  const columnNames = {
    repositoryName: 'Name',
    repositoryLabel: 'Label',
  };

  /* Pagination logic for bottom of Table */

  const [activeSortDirection, setActiveSortDirection] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);

  const onSetPage = (_event, newPage) => {
    setPage(newPage);
  };
  const onPerPageSelect = (_event, newPerPage, newPage) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };

  /* Sortable Table Rationale */

  const [activeSortIndex, setActiveSortIndex] = React.useState(null);
  const getSortableRowValues = (repositories) => {
    const { repositoryName, repositoryLabel } = repositories;
    return [repositoryName, repositoryLabel];
  };

  let sortedRepositories = repositories;
  if (activeSortIndex !== null) {
    sortedRepositories = repositories?.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      if (typeof aValue === 'number') {
        if (activeSortDirection === 'asc') {
          return aValue - bValue;
        }
        return bValue - aValue;
      } else {
        if (activeSortDirection === 'asc') {
          return aValue?.localeCompare(bValue);
        }
        return bValue?.localeCompare(aValue);
      }
    });
  }

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

  /* Table Items Selection Check Boxes Rationale */
  const isRepoSelectable = (repositories) =>
    repositories.repositoryName !== 'a';
  const [selectedRepoNames, setSelectedRepoNames] = React.useState(null);

  const reposTablePaginationBottom = (
    <Pagination
      perPageComponent="button"
      itemCount={repositories?.length}
      perPage={perPage}
      page={page}
      onSetPage={onSetPage}
      widgetId="top-example"
      onPerPageSelect={onPerPageSelect}
    />
  );

  /* Filter options for search bar Logic */
  const [searchValue, setSearchValue] = React.useState('');
  const onFilter = (repositories) => {
    let searchValueInput;
    try {
      searchValueInput = new RegExp(searchValue, 'i');
    } catch (err) {
      searchValueInput = new RegExp(
        searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
        'i'
      );
    }
    const matchesSearchValue =
      repositories.repositoryName.search(searchValueInput) >= 0;
    const matchesLabelValue =
      repositories.repositoryLabel.search(searchValueInput) >= 0;
    return (
      (searchValue === '' || matchesSearchValue) &&
      (searchValue === '' || matchesLabelValue)
    );
  };
  const filteredRepos = repositories.filter(onFilter);

  /* Empty State filter search return rationale*/

  const emptyState = (
    <EmptyState>
      <EmptyStateIcon icon={SearchIcon} />
      <Title size="lg" headingLevel="h4">
        No results found
      </Title>
      <EmptyStateBody>
        No results match the filter criteria. Clear all filters and try again.
      </EmptyStateBody>
      <EmptyStatePrimary>
        <Button
          variant="link"
          onClick={() => {
            setSearchValue('');
          }}
        >
          Clear all filters
        </Button>
      </EmptyStatePrimary>
    </EmptyState>
  );

  return (
    <>
      <TableComposable
        aria-label="Additional Repositories Selectable Table"
        variant="compact"
      >
        <Thead>
          <Tr ouiaSafe={true}>
            <Th />
            <Th sort={getSortParams(0)}>{columnNames.repositoryName}</Th>
            <Th sort={getSortParams(1)}>{columnNames.repositoryLabel}</Th>
            <Td></Td>
          </Tr>
        </Thead>
        <Tbody>
          {sortedRepositories &&
            filteredRepos?.map((repositories, rowIndex) => (
              <Tr
                key={(repositories?.repositoryName, rowIndex)}
                ouiaSafe={true}
              >
                <Td
                  select={{
                    rowIndex,
                    onSelect: () =>
                      setSelectedRepoNames(repositories.repositoriesName),
                    isSelected:
                      selectedRepoNames === repositories.repositoryName,
                    disable: !isRepoSelectable(repositories),
                    variant: 'checkbox',
                  }}
                />
                <Td dataLabel={columnNames.repositoryName} modifier="truncate">
                  {repositories.repositoryName}
                </Td>
                <Td dataLabel={columnNames.repositoryLabel} modifier="truncate">
                  {repositories.repositoryLabel}
                </Td>
              </Tr>
            ))}
          {filteredRepos?.length === 0 && (
            <Tr>
              <Td colSpan={8}>
                <Bullseye>{emptyState}</Bullseye>
              </Td>
            </Tr>
          )}
        </Tbody>
      </TableComposable>
      {reposTablePaginationBottom}
    </>
  );
};

EditAdditionalRepositoriesTable.propTypes = {
  repositories: propTypes.array,
};

export default EditAdditionalRepositoriesTable;
