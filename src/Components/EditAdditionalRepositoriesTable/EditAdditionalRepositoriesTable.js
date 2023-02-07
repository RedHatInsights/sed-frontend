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
  ActionGroup,
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
  const {
    handleModalToggle,
    repositories,
    setAdditionalRepos,
    submitForm,
    isLoading,
    error,
  } = props;

  const columnNames = {
    repositoryName: 'Name',
    repositoryLabel: 'Label',
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm({
      repositoryLabel: repositories.repositoryLabel,
    });
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
  const [selectedRepoLabel, setSelectedRepoLabel] = React.useState([]);
  const [recentSelectedRowIndex, setRecentSelectedRowIndex] =
    React.useState(null);
  const [showTableData, setShowTableData] = React.useState(false);
  const [allSelectTableToggle, setAllSelectTableToggle] = React.useState('all');
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
          <MenuItem itemId='Name'>Name</MenuItem>
          <MenuItem itemId='Label'>Label</MenuItem>
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

  const onAllToggleEvent = () => {
    const id = event.currentTarget.id;
    setShowTableData(id);
    setAllSelectTableToggle(id);
  };
  const onToggleEventChange = () => {
    const id = event.currentTarget.id;
    setShowTableData(!id);
    setAllSelectTableToggle(id);
  };

  const handleRowSelection = (rowIndex) => {
    if (selectedRepoLabel.includes(repositories[rowIndex].label)) {
      setSelectedRepoLabel(
        selectedRepoLabel.filter(
          (label) => label !== repositories[rowIndex].label
        )
      );
    } else {
      setSelectedRepoLabel([
        ...selectedRepoLabel,
        repositories[rowIndex].label,
      ]);
    }
  };

  const allAndSelectedToggleGroup = (
    <React.Fragment>
      <ToggleGroup aria-label='All and Selected Toggle Group'>
        <ToggleGroupItem
          text='All'
          buttonId='all'
          isSelected={allSelectTableToggle === 'all'}
          onChange={onAllToggleEvent}
        />
        <ToggleGroupItem
          text='Selected'
          buttonId='selected'
          isSelected={allSelectTableToggle === 'selected'}
          onChange={onToggleEventChange}
          isDisabled={selectedRepoLabel.length == 0}
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
  const sortedRepositories = sortRepos(repositories, activeSortIndex);
  const searchedRepos = filterReposBySearch(sortedRepositories, searchValue);
  const paginatedRepos = getPage(searchedRepos);

  React.useEffect(() => {
    setAdditionalRepos(selectedRepoLabel);
  }, [selectedRepoLabel]);

  const isRepoSelectable = (repo) => repo.repositoryLabel !== 'a';

  const setRepoSelected = (repo, isSelecting = true) =>
    setSelectedRepoLabel((prevSelected) => {
      const otherSelectedRepoLabel = prevSelected.filter(
        (r) => r !== repo.repositoryLabel
      );
      return isSelecting && isRepoSelectable(repo)
        ? [...otherSelectedRepoLabel, repo.repositoryLabel]
        : otherSelectedRepoLabel;
    });
  const isRepoSelected = (repositories) =>
    selectedRepoLabel.includes(repositories?.repositoryLabel);

  const saveDisabled = () => {
    if (selectedRepoLabel.length === 0) {
      return true;
    } else {
      return false;
    }
  };

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
      id='search-input-filter-toolbar'
      clearAllFilters={() => {
        setSearchValue('');
      }}
    >
      <ToolbarGroup variant='filter-group'>
        <ToolbarItem>{attributeDropdown}</ToolbarItem>
        <ToolbarItem
          chips={searchValue !== '' ? [searchValue] : []}
          deleteChip={() => setSearchValue('')}
          deleteChipGroup={() => setSearchValue('')}
          categoryName='Name'
          showToolbarItem={activeAttributeMenu === 'Name' || 'Label'}
          variant='search-filter'
        >
          {toolbarSearchInput}
        </ToolbarItem>
        <ToolbarItem style={{ paddingLeft: 10 }}>
          {allAndSelectedToggleGroup}
        </ToolbarItem>
      </ToolbarGroup>
      <ToolbarItem variant='pagination' align={{ default: 'alignRight' }}>
        {pagination()}
      </ToolbarItem>
    </PrimaryToolbar>
  );

  const emptyState = (
    <EmptyState>
      <EmptyStateIcon icon={SearchIcon} />
      <Title size='lg' headingLevel='h4'>
        No results found
      </Title>
      <EmptyStateBody>
        No results match the filter criteria. Clear all filters and try again.
      </EmptyStateBody>
      <EmptyStatePrimary>
        <Button
          variant='link'
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
      <React.Fragment onSubmit={handleSubmit}>
        {editAdditionalReposToolbar}
        <TableComposable
          aria-label='Additional Repositories Selectable Table'
          variant='compact'
          {...(allSelectTableToggle !== 'all' || 'selected')}
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
                      onChange={() => {
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
              : repositories?.map(
                  (repositories, rowIndex) =>
                    (!showTableData || isRepoSelected(repositories)) && (
                      <Tr key={(repositories, rowIndex)} ouiaSafe={true}>
                        <Td
                          select={{
                            rowIndex,
                            onSelect: (_event, isSelecting) =>
                              onSelectRepo(repositories, rowIndex, isSelecting),
                            isSelected: isRepoSelected(repositories),
                            disable: !isRepoSelectable(repositories),
                          }}
                          onChange={() => {
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
        {EditChangesButtons}
      </React.Fragment>
    );
  };

  const EditChangesButtons = (
    <ActionGroup>
      <Button
        key='Save changes'
        variant='primary'
        onClick={() => {
          submitForm();
          handleModalToggle();
        }}
        isDisabled={saveDisabled()}
      >
        Save changes
      </Button>
      <Button key='cancel' variant='link' onClick={handleModalToggle}>
        Cancel
      </Button>
    </ActionGroup>
  );
  if (isLoading && !error) {
    return <Loading />;
  } else if (!isLoading && !error) {
    return EditReposTable();
  } else {
    return <Unavailable />;
  }
};

EditAdditionalRepositoriesTable.propTypes = {
  handleModalToggle: propTypes.func.isRequired,
  submitForm: propTypes.func.isRequired,
  setAdditionalRepos: propTypes.func.isRequired,
  isSuccess: propTypes.bool,
  isError: propTypes.bool,
  repositories: propTypes.array,
  activationKey: propTypes.object,
  isLoading: propTypes.func,
  error: propTypes.func,
};

export default EditAdditionalRepositoriesTable;
