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
  Toolbar,
  ToolbarContent,
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
  ToolbarGroup,
  ToolbarFilter,
  PaginationVariant,
} from '@patternfly/react-core';
import { SearchIcon } from '@patternfly/react-icons';
import { FilterIcon } from '@patternfly/react-icons';
import NoAdditionalRepositories from '../AdditionalRepositoriesTable/NoAdditionalRepositories';

const EditAdditionalRepositoriesTable = (props) => {
  const { repositories } = props;

  const columnNames = {
    repositoryName: 'Name',
    repositoryLabel: 'Label',
  };

  /* Filter options rationale*/
  const [searchValue, setSearchValue] = React.useState('');
  const onSearchChange = (value) => {
    setSearchValue(value);
  };
  const onFilter = (repo) => {
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
      repo.repositoryName.search(searchValueInput) >= 0;
    const matchesLabelValue =
      repo.repositoryLabel.search(searchValueInput) >= 0;
    return (
      (searchValue === '' || matchesSearchValue) &&
      (searchValue === '' || matchesLabelValue)
    );
  };
  const filteredRepos = repositories?.filter(onFilter);

  /* Toolbar Function Rationale */
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [activeAttributeMenu, setActiveAttributeMenu] = React.useState('Name');
  const [isAttributeMenuOpen, setIsAttributeMenuOpen] = React.useState(false);
  const [activeSortIndex, setActiveSortIndex] = React.useState(null);
  const [activeSortDirection, setActiveSortDirection] = React.useState(null);
  const [selectedRepoNames, setSelectedRepoNames] = React.useState([]);
  const [recentSelectedRowIndex, setRecentSelectedRowIndex] =
    React.useState(null);
  const [shifting, setShifting] = React.useState(false);
  const getSortableRowValues = (repo) => {
    const { repositoryName, repositoryLabel } = repo;
    return [repositoryName, repositoryLabel];
  };
  const attributeToggleRef = React.useRef(null);
  const attributeMenuRef = React.useRef(null);
  const attributeContainerRef = React.useRef(null);
  const placeholderValue = `Filter By ${activeAttributeMenu}`;
  const onSetPage = (_event, newPage) => {
    setPage(newPage);
  };
  const onPerPageSelect = (_event, newPerPage, newPage) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };
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
  /*Pagination*/

  const getPage = (repo) => {
    const first = (page - 1) * perPage;
    const last = first + perPage;
    return repo?.slice(first, last);
  };

  const paginatedRepos = getPage(repositories);
  const pagination = (variant = PaginationVariant.bottom) => (
    <Pagination
      perPageComponent="button"
      itemCount={repositories?.length}
      perPage={perPage}
      page={page}
      onSetPage={onSetPage}
      onPerPageSelect={onPerPageSelect}
      isCompact
      variant={variant}
    />
  );

  /*Table sorting Filter by asc- desc*/

  let sortedRepositories = repositories && filteredRepos && paginatedRepos;
  if (activeSortIndex !== null) {
    sortedRepositories = repositories.sort((a, b) => {
      const aValue = getSortableRowValues(a)[activeSortIndex];
      const bValue = getSortableRowValues(b)[activeSortIndex];
      if (typeof aValue === 'number') {
        if (activeSortDirection === 'asc') {
          return aValue - bValue;
        }
        return bValue - aValue;
      } else {
        if (activeSortDirection === 'asc') {
          return aValue.localeCompare(bValue);
        }
        return bValue.localeCompare(aValue);
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
    selectedRepoNames.includes(repositories?.repositoryName);

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
  /* Toolbar for Repos Table with Filter/ Search */

  const editAdditionalReposToolbar = (
    <Toolbar
      id="search-input-filter-toolbar"
      clearAllFilters={() => {
        setSearchValue('');
      }}
    >
      <ToolbarContent>
        <ToolbarGroup variant="filter-group">
          <ToolbarItem>{attributeDropdown}</ToolbarItem>
          <ToolbarFilter
            chips={searchValue !== '' ? [searchValue] : []}
            deleteChip={() => setSearchValue('')}
            deleteChipGroup={() => setSearchValue('')}
            categoryName="Name"
            showToolbarItem={activeAttributeMenu === 'Name' || 'Label'}
            variant="search-filter"
          >
            {toolbarSearchInput}
          </ToolbarFilter>
        </ToolbarGroup>
        <ToolbarItem variant="pagination" align={{ default: 'alignRight' }}>
          <Pagination
            perPageComponent="button"
            itemCount={repositories?.length}
            perPage={perPage}
            page={page}
            onSetPage={onSetPage}
            onPerPageSelect={onPerPageSelect}
            isCompact
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

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

  if (repositories && repositories.length > 0) {
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
              {/* <Td></Td> */}
            </Tr>
          </Thead>
          <Tbody>
            {sortedRepositories?.map((repositories, rowIndex) => (
              <Tr
                key={(repositories?.repositoryName, rowIndex)}
                ouiaSafe={true}
              >
                <Td
                  select={{
                    rowIndex,
                    onSelect: (_event, isSelecting) =>
                      onSelectRepo(repositories, rowIndex, isSelecting),
                    isSelected: isRepoSelected(repositories),
                    disable: !isRepoSelectable(repositories),
                  }}
                />
                <Td dataLabel={columnNames.repositoryName}>
                  {repositories.repositoryName}
                </Td>
                <Td dataLabel={columnNames.repositoryLabel}>
                  {repositories.repositoryLabel}
                </Td>
              </Tr>
            ))}
            {sortedRepositories?.length === 0 && (
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
  } else {
    return <NoAdditionalRepositories />;
  }
};

EditAdditionalRepositoriesTable.propTypes = {
  repositories: propTypes.array,
};

export default EditAdditionalRepositoriesTable;
