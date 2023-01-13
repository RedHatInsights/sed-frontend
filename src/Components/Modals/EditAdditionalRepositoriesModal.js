import React from 'react';
import {
  Modal,
  ModalVariant,
  Menu,
  MenuItem,
  MenuToggle,
  SearchInput,
  MenuList,
  MenuContent,
  Popper,
  Button,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  ToolbarGroup,
  ToolbarFilter,
} from '@patternfly/react-core';
import { Pagination } from '@patternfly/react-core';
import propTypes from 'prop-types';
import { FilterIcon } from '@patternfly/react-icons/dist/esm/icons/filter-icon';
import EditAdditionalRepositoriesTable from '../ActivationKeysTable/EditAdditionalRepositoriesTable';

const EditAdditionalRepositoriesModal = (props) => {
  const { handleModalToggle, isOpen, repositories } = props;
  const [activeAttributeMenu, setActiveAttributeMenu] = React.useState('Name');
  const [isAttributeMenuOpen, setIsAttributeMenuOpen] = React.useState(false);
  const [activeSortDirection, setActiveSortDirection] = React.useState(null);
  const attributeToggleRef = React.useRef(null);
  const attributeMenuRef = React.useRef(null);
  const attributeContainerRef = React.useRef(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const placeholderValue = `Filter By ${activeAttributeMenu}`;
  const editAdditionalRepositoriesDescription =
    'The core repositories for your operating system version, for example BaseOS and AppStream, are always enabled and do not need to be explicitly added to the activation key.';
  const onSearchChange = (value) => {
    setSearchValue(value);
  };

  /* Filter options rationale*/
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
  /* Pagination rationale*/
  const onSetPage = (_event, newPage) => {
    setPage(newPage);
  };
  const onPerPageSelect = (_event, newPerPage, newPage) => {
    setPerPage(newPerPage);
    setPage(newPage);
  };

  /* handlers */
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
  /* Toolbar Function Rationale */

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
        onSelect={() => setActiveSortDirection('asc')}
        isSelected={activeSortDirection === 'asc'}
        id="ascending"
        key="ascending"
      />
    </div>
  );

  const toolbarSearchInput = (
    <SearchInput
      placeholder={placeholderValue}
      value={searchValue}
      onChange={onSearchChange}
      // isDisabled={repositories?.length == 0}
      onClear={() => onSearchChange('')}
      onSelect={() => setActiveSortDirection('desc')}
      isSelected={activeSortDirection === 'desc'}
      key="descending"
      style={{
        width: '300px',
      }}
    />
  );

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
            categoryName=""
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
            widgetId="top-example"
            onPerPageSelect={onPerPageSelect}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
  /* Modal Return with attributes */

  return (
    <React.Fragment>
      <Modal
        variant={ModalVariant.large}
        title="Edit additional repositories"
        description={editAdditionalRepositoriesDescription}
        isOpen={isOpen}
        onClose={handleModalToggle}
        actions={[
          <Button
            key="Save changes"
            variant="primary"
            onClick={handleModalToggle}
            isDisabled
          >
            Save Changes
          </Button>,
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>,
        ]}
      >
        {editAdditionalReposToolbar}
        <EditAdditionalRepositoriesTable repositories={repositories} />
      </Modal>
    </React.Fragment>
  );
};

EditAdditionalRepositoriesModal.propTypes = {
  handleModalToggle: propTypes.func.isRequired,
  isOpen: propTypes.bool.isRequired,
  modalSize: propTypes.string,
  repositories: propTypes.array,
};

export default EditAdditionalRepositoriesModal;
