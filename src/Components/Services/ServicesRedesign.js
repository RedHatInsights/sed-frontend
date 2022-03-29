import React, { Fragment, useState } from 'react';
import {
  Alert,
  Button,
  Stack,
  StackItem,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  FlexItem,
  Flex,
} from '@patternfly/react-core';
import { CheckCircleIcon, BanIcon } from '@patternfly/react-icons';
import propTypes from 'prop-types';
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@patternfly/react-table';

import { permissions } from './permissionsConfig';

const Services = ({ defaults, setConfirmChangesOpen }) => {
  const [formState, setFormState] = useState({
    enableCloudConnector: defaults.enableCloudConnector,
    useOpenSCAP: defaults.useOpenSCAP,
    connectToInsights:
      defaults.hasInsights ||
      defaults.useOpenSCAP ||
      defaults.enableCloudConnector,
  });

  const [isEditing, setIsEditing] = useState(false);

  const getStatusIcon = (row) => {
    if (formState[row.id]) {
      return (
        <Flex style={{ color: 'var(--pf-global--success-color--200)' }}>
          <FlexItem>
            <CheckCircleIcon />
          </FlexItem>
          <FlexItem>Enabled</FlexItem>
        </Flex>
      );
    }
    return (
      <Flex style={{ color: 'var(--pf-global--default-color--300)' }}>
        <FlexItem>
          <BanIcon />
        </FlexItem>
        <FlexItem>Disabled</FlexItem>
      </Flex>
    );
  };

  return (
    <Stack hasGutter className="pf-u-p-md">
      <StackItem>
        <Toolbar id="toolbar-items">
          <ToolbarContent>
            {!isEditing && (
              <ToolbarItem>
                <Button
                  ouiaId="secondary-edit-button"
                  onClick={() => setIsEditing(true)}
                  variant="secondary"
                >
                  Change settings
                </Button>
              </ToolbarItem>
            )}
            {isEditing && (
              <>
                <ToolbarItem>
                  <Button
                    ouiaId="primary-save-button"
                    onClick={() => setConfirmChangesOpen(true)}
                  >
                    Save changes
                  </Button>
                </ToolbarItem>
                <ToolbarItem>
                  <Button
                    ouiaId="secondary-cancel-button"
                    onClick={() => setIsEditing(false)}
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </ToolbarItem>
                <ToolbarItem>
                  <Alert
                    variant="info"
                    isInline
                    isPlain
                    title="Changes will affect all systems connected with Red Hat connector"
                  />
                </ToolbarItem>
              </>
            )}
          </ToolbarContent>
        </Toolbar>
      </StackItem>
      <StackItem>
        <TableComposable aria-label="Settings table">
          <Thead>
            <Tr>
              <Th>Permission</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {permissions.map((row) => (
              <Tr key={row.name}>
                <Td dataLabel="Permission" width={80}>
                  <Stack>
                    <StackItem>
                      <Flex>
                        <FlexItem>
                          <b>{row.name}</b>
                        </FlexItem>
                        {row.additionalInfo && (
                          <FlexItem
                            style={{ color: 'var(--pf-global--Color--100)' }}
                          >
                            <i>{row.additionalInfo}</i>
                          </FlexItem>
                        )}
                      </Flex>
                    </StackItem>
                    <StackItem>{row.description}</StackItem>
                    {row.links && (
                      <StackItem>
                        <Flex>
                          {row.links.map((link) => (
                            <FlexItem key={link.name}>
                              <a
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.name}
                              </a>
                            </FlexItem>
                          ))}
                        </Flex>
                      </StackItem>
                    )}
                  </Stack>
                </Td>
                {!isEditing && <Td dataLabel="Status">{getStatusIcon(row)}</Td>}
                {isEditing && (
                  <Td dataLabel="Status">
                    <ToggleGroup aria-label="Default with single selectable">
                      <ToggleGroupItem
                        text="Enabled"
                        isSelected={formState[row.id]}
                        onChange={() =>
                          setFormState({ ...formState, [row.id]: true })
                        }
                      />
                      <ToggleGroupItem
                        text="Disabled"
                        isSelected={!formState[row.id]}
                        onChange={() =>
                          setFormState({ ...formState, [row.id]: false })
                        }
                      />
                    </ToggleGroup>
                  </Td>
                )}
              </Tr>
            ))}
          </Tbody>
        </TableComposable>
      </StackItem>
    </Stack>
  );
};

Services.propTypes = {
  setMadeChanges: propTypes.func.isRequired,
  defaults: propTypes.shape({
    useOpenSCAP: propTypes.bool,
    hasInsights: propTypes.bool,
    enableCloudConnector: propTypes.bool,
  }),
  onChange: propTypes.func.isRequired,
  madeChanges: propTypes.bool,
  setConfirmChangesOpen: propTypes.func.isRequired,
};

Services.defaultProps = {
  defaults: {
    useOpenSCAP: false,
    hasInsights: false,
    enableCloudConnector: false,
  },
};

export default Services;
