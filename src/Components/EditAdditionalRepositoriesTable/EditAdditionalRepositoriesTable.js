import React from 'react';
import propTypes from 'prop-types';
import {
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  TableComposable,
} from '@patternfly/react-table';
import {
  SearchInput,
  ToolbarItem,
  Menu,
  MenuContent,
  MenuList,
  MenuItem,
  MenuToggle,
  Pagination,
  Popper,
  EmptyState,
  EmptyStateIcon,
  Title,
  EmptyStateBody,
  EmptyStatePrimary,
  Button,
  Bullseye,
  ToggleGroup,
  ToggleGroupItem,
  ToolbarGroup,
  PaginationVariant,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { FilterIcon } from '@patternfly/react-icons';
import Loading from '../LoadingState/Loading';
import Unavailable from '@redhat-cloud-services/frontend-components/Unavailable';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';

const EditAdditionalRepositoriesTable = (props) => {
  const { repositories, isLoading, error } = props;

  const columnNames = {
    repositoryName: 'Name',
    repositoryLabel: 'Label',
  };

  const [searchValue, setSearchValue] = React.useState('');
  const onSearchChange = (value) => {
    setSearchValue(value);
  };

  const filterReposBySearch = (repositories, searchValue) => {
    return repositories?.filter((entry) => {
      const searchTerm = searchValue.toLowerCase().trim();
      const repoName = (entry.repositoryName || '').toLowerCase();
      const repoLabel = (entry.repositoryLabel || '').toLowerCase();
      return repoName.includes(searchTerm) || repoLabel.includes(searchTerm);
    });
  };
  const countRepos = (repositories, searchValue) => {
    const filteredData = filterReposBySearch(repositories, searchValue);
    return filteredData?.length;
  };

  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [activeAttributeMenu, setActiveAttributeMenu] = React.useState('Name');
  const [isAttributeMenuOpen, setIsAttributeMenuOpen] = React.useState(false);
  const [activeSortIndex, setActiveSortIndex] = React.useState(null);
  const [activeSortDirection, setActiveSortDirection] = React.useState(null);
  const [selectedRepoNames, setSelectedRepoNames] = React.useState([]);
  const [recentSelectedRowIndex, setRecentSelectedRowIndex] =
    React.useState(null);
  const [showTableData, setShowTableData] = React.useState(false);
  const [allSelectTableToggle, setAllSelectTableToggle] = React.useState('All');
  const [shifting, setShifting] = React.useState(false);
  const attributeToggleRef = React.useRef(null);
  const attributeMenuRef = React.useRef(null);
  const attributeContainerRef = React.useRef(null);
  const placeholderValue = `Filter By ${activeAttributeMenu}`;
  const handleAttribueMenuKeys = (event) => {
    if (!isAttributeMenuOpen) {
      return;
    }
    if (
      attributeMenuRef.current?.contains(event.target) ||
      attributeToggleRef.current?.contains(event.target)
    ) {
      if (event.key === 'Escape' || event.key === 'Tab') {
        setIsAttributeMenuOpen(!isAttributeMenuOpen);
        attributeToggleRef.current?.focus();
      }
    }
  };
  const handleAttributeClickOutside = (event) => {
    if (
      isAttributeMenuOpen &&
      !attributeMenuRef.current?.contains(event.target)
    ) {
      setIsAttributeMenuOpen(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener('keydown', handleAttribueMenuKeys);
    window.addEventListener('click', handleAttributeClickOutside);
    return () => {
      window.removeEventListener('keydown', handleAttribueMenuKeys);
      window.removeEventListener('click', handleAttributeClickOutside);
    };
  }, [isAttributeMenuOpen, attributeMenuRef]);
  const onAttributeToggleClick = (ev) => {
    ev.stopPropagation();
    setTimeout(() => {
      if (attributeMenuRef.current) {
        const firstElement = attributeMenuRef.current.querySelector(
          'li > button:not(:disabled)'
        );
        firstElement && firstElement.focus();
      }
    }, 0);
    setIsAttributeMenuOpen(!isAttributeMenuOpen);
  };
  const attributeToggle = (
    <MenuToggle
      ref={attributeToggleRef}
      onClick={onAttributeToggleClick}
      isExpanded={isAttributeMenuOpen}
      icon={<FilterIcon />}
    >
      {activeAttributeMenu}
    </MenuToggle>
  );

  const attributeMenu = (
    <Menu
      ref={attributeMenuRef}
      onSelect={(_ev, itemId) => {
        setActiveAttributeMenu(itemId?.toString());
        setIsAttributeMenuOpen(!isAttributeMenuOpen);
      }}
    >
      <MenuContent>
        <MenuList>
          <MenuItem itemId="Name">Name</MenuItem>
          <MenuItem itemId="Label">Label</MenuItem>
        </MenuList>
      </MenuContent>
    </Menu>
  );

  const attributeDropdown = (
    <div ref={attributeContainerRef}>
      <Popper
        trigger={attributeToggle}
        popper={attributeMenu}
        appendTo={attributeContainerRef.current || undefined}
        isVisible={isAttributeMenuOpen}
      />
    </div>
  );

  const toolbarSearchInput = (
    <SearchInput
      placeholder={placeholderValue}
      value={searchValue}
      onChange={onSearchChange}
      isDisabled={repositories?.length == 0}
      onClear={() => onSearchChange('')}
      style={{
        width: '400px',
      }}
    />
  );

  const [deselectedRepoNames, setDeselectedRepoNames] = React.useState([]);

  const handleRowSelection = (selected, rowIndex) => {
    if (selectedRepoNames.includes(repositories[rowIndex].repositoryName)) {
      setDeselectedRepoNames([
        ...deselectedRepoNames,
        repositories[rowIndex].repositoryName,
      ]);
      setSelectedRepoNames(
        selectedRepoNames.length.filter(
          (name) => name !== repositories[rowIndex].repositoryName
        )
      );
    } else {
      setSelectedRepoNames([
        ...selectedRepoNames.length,
        repositories[rowIndex].repositoryName,
      ]);
    }
  };

  const onAllToggleEvent = () => {
    setAllSelectTableToggle('All');
    setShowTableData(false);
    setDeselectedRepoNames([]);
  };
  const onToggleEventChange = () => {
    setAllSelectTableToggle('Selected');
    setShowTableData(true);
    setDeselectedRepoNames([]);
  };

  const filteredRepos = filterReposBySearch(repositories, searchValue);

  const allAndSelectedToggleGroup = (
    <React.Fragment>
      <ToggleGroup aria-label="Toggle Group">
        <ToggleGroupItem
          text="All"
          buttonId="all"
          isSelected={allSelectTableToggle === 'All'}
          onChange={onAllToggleEvent}
        />
        <ToggleGroupItem
          text="Selected"
          buttonId="selected"
          isSelected={allSelectTableToggle === 'Selected'}
          onChange={onToggleEventChange}
          isDisabled={selectedRepoNames.length == 0}
        />
      </ToggleGroup>
    </React.Fragment>
  );

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

  const pagination = (variant = PaginationVariant.top) =>
    !showTableData && (
      <Pagination
        perPageComponent="button"
        itemCount={countRepos(repositories, searchValue)}
        perPage={perPage}
        page={page}
        onSetPage={handleSetPage}
        onPerPageSelect={handlePerPageSelect}
        variant={variant}
        isCompact
      />
    );

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
  const sortedRepositories = sortRepos(
    repositories,
    activeSortIndex,
    activeSortDirection
  );
  const searchedRepos = filterReposBySearch(sortedRepositories, searchValue);
  const paginatedRepos = getPage(searchedRepos);

  const isRepoSelectable = (repo) => repo.repositoryName !== 'a';

  const setRepoSelected = (repo, isSelecting = true) =>
    setSelectedRepoNames((prevSelected) => {
      const otherSelectedRepoNames = prevSelected.filter(
        (r) => r !== repo.repositoryName
      );
      return isSelecting && isRepoSelectable(repo)
        ? [...otherSelectedRepoNames, repo.repositoryName]
        : otherSelectedRepoNames;
    });

  const isRepoSelected = (repositories) =>
    selectedRepoNames?.includes(repositories?.repositoryName);

  const isRepoDeselected = (repositories) =>
    deselectedRepoNames?.includes(repositories?.repositoryName);

  const onSelectRepo = (repositories, rowIndex, isSelecting) => {
    if (shifting && recentSelectedRowIndex !== null) {
      const numberSelected = rowIndex - recentSelectedRowIndex;
      const intermediateIndexes =
        numberSelected > 0
          ? Array.from(
              new Array(numberSelected + 1),
              (_x, i) => i + recentSelectedRowIndex
            )
          : Array.from(
              new Array(Math.abs(numberSelected) + 1),
              (_x, i) => i + rowIndex
            );
      intermediateIndexes.forEach((index) =>
        setRepoSelected(repositories[index], isSelecting)
      );
    } else {
      setRepoSelected(repositories, isSelecting);
    }
    setRecentSelectedRowIndex(rowIndex);
  };
  React.useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Shift') {
        setShifting(true);
      }
    };
    const onKeyUp = (e) => {
      if (e.key === 'Shift') {
        setShifting(false);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  const editAdditionalReposToolbar = (
    <PrimaryToolbar
      id="search-input-filter-toolbar"
      clearAllFilters={() => {
        setSearchValue('');
      }}
    >
      <ToolbarGroup variant="filter-group">
        <ToolbarItem>{attributeDropdown}</ToolbarItem>
        <ToolbarItem
          chips={searchValue !== '' ? [searchValue] : []}
          deleteChip={() => setSearchValue('')}
          deleteChipGroup={() => setSearchValue('')}
          categoryName="Name"
          showToolbarItem={activeAttributeMenu === 'Name' || 'Label'}
          variant="search-filter"
        >
          {toolbarSearchInput}
        </ToolbarItem>
        <ToolbarItem style={{ paddingLeft: 10 }}>
          {allAndSelectedToggleGroup}
        </ToolbarItem>
      </ToolbarGroup>

      <ToolbarItem variant="pagination" align={{ default: 'alignRight' }}>
        {pagination()}
      </ToolbarItem>
    </PrimaryToolbar>
  );

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

  const EditReposTable = () => {
    return (
      <React.Fragment>
        {editAdditionalReposToolbar}
        <TableComposable
          aria-label="Additional Repositories Selectable Table"
          variant="compact"
        >
          <Thead>
            <Tr ouiaSafe={true}>
              <Th />
              <Th sort={getSortParams(0)} width={50}>
                {columnNames.repositoryName}
              </Th>
              <Th sort={getSortParams(1)}>{columnNames.repositoryLabel}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!showTableData
              ? paginatedRepos?.map((repositories, rowIndex) => (
                  <Tr key={(repositories, rowIndex)} ouiaSafe={true}>
                    <Td
                      select={{
                        rowIndex,
                        onSelect: (_event, isSelecting) =>
                          onSelectRepo(repositories, rowIndex, isSelecting),
                        isSelected: isRepoSelected(repositories),
                        disable: !isRepoSelectable(repositories),
                      }}
                      checked={selectedRepoNames.includes(
                        rowIndex.repositoryName
                      )}
                      onChange={(event) => {
                        handleRowSelection(event.target.checked, rowIndex);
                      }}
                    />
                    <Td dataLabel={columnNames.repositoryName}>
                      {repositories.repositoryName}
                    </Td>
                    <Td dataLabel={columnNames.repositoryLabel}>
                      {repositories.repositoryLabel}
                    </Td>
                  </Tr>
                ))
              : filteredRepos?.map(
                  (repositories, rowIndex) =>
                    (!showTableData ||
                      isRepoSelected(repositories) ||
                      isRepoDeselected(repositories)) && (
                      <Tr key={(repositories, rowIndex)} ouiaSafe={true}>
                        <Td
                          select={{
                            rowIndex,
                            onSelect: (_event, isSelecting) =>
                              onSelectRepo(repositories, rowIndex, isSelecting),
                            isSelected: isRepoSelected(repositories),
                            disable: !isRepoSelectable(repositories),
                          }}
                          onChange={(event) => {
                            handleRowSelection(event.target.checked, rowIndex);
                          }}
                        />
                        <Td dataLabel={columnNames.repositoryName}>
                          {repositories.repositoryName}
                        </Td>
                        <Td dataLabel={columnNames.repositoryLabel}>
                          {repositories.repositoryLabel}
                        </Td>
                      </Tr>
                    )
                )}
            {paginatedRepos?.length == 0 && (
              <Tr>
                <Td colSpan={8}>
                  <Bullseye>{emptyState}</Bullseye>
                </Td>
              </Tr>
            )}
          </Tbody>
        </TableComposable>
        {pagination(PaginationVariant.bottom)}
      </React.Fragment>
    );
  };
  if (isLoading && !error) {
    return <Loading />;
  } else if (!isLoading && !error) {
    return EditReposTable();
  } else {
    return <Unavailable />;
  }
};

EditAdditionalRepositoriesTable.propTypes = {
  repositories: propTypes.array,
  activationKey: propTypes.object,
  isLoading: propTypes.func,
  error: propTypes.func,
};

export default EditAdditionalRepositoriesTable;
