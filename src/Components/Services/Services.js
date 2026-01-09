import React from 'react';
import {
  Alert,
  Stack,
  StackItem,
  ToggleGroup,
  ToggleGroupItem,
  FlexItem,
  Flex,
  Spinner,
  spinnerSize,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import propTypes from 'prop-types';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

import { permissions } from './permissionsConfig';
import ConditionalTooltip from '../shared/ConditionalTooltip';

import useFeatureFlag from '../../hooks/useFeatureFlag';
import { useRbacPermissions } from '../../hooks/useRbacPermissions';

const Services = ({
  defaults = { compliance: false, active: false, remediations: false },
  setConfirmChangesOpen,
  onChange,
  isLoading,
}) => {
  const { data: rbacPermissions, isLoading: isRbacLoading } =
    useRbacPermissions();
  const hasAccess = Boolean(
    rbacPermissions?.canReadConfigManagerProfile &&
      rbacPermissions?.canWriteConfigManagerProfile &&
      rbacPermissions?.canReadInventoryHosts &&
      rbacPermissions?.canWriteInventoryHosts
  );

  const isLightspeedRebrandEnabled = useFeatureFlag(
    'platform.lightspeed-rebrand'
  );

  const NO_ACCESS_TOOLTIP_CONTENT = (
    <div>
      To perform this action, you must be granted the &quot;RHC
      Administrator&quot; and &quot;Inventory Hosts Administrator&quot; roles by
      your Organization Administrator in your Setting&apos;s User Access area.
    </div>
  );

  return (
    <Stack hasGutter>
      <StackItem>
        <Alert
          variant="info"
          isInline
          title="Changes will affect all systems connected with Remote Host Configuration"
        />
      </StackItem>
      <StackItem>
        <Table aria-label="Settings table">
          <Thead>
            <Tr>
              <Th style={{ fontSize: 14 }}>Permission</Th>
              <Th style={{ fontSize: 14 }}>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {permissions.map((row) => (
              <Tr
                key={isLightspeedRebrandEnabled ? row.nameLigthspeed : row.name}
              >
                <Td
                  dataLabel="Permission"
                  width={80}
                  style={row.secondary && { paddingLeft: 70, fontSize: 14 }}
                >
                  <Stack>
                    <StackItem>
                      <Flex>
                        <FlexItem>
                          <b>
                            {isLightspeedRebrandEnabled
                              ? row.nameLigthspeed
                              : row.name}
                          </b>
                        </FlexItem>
                        {row.additionalInfo && (
                          <FlexItem
                            style={{
                              color: 'var(--pf-t--color--gray--50)',
                            }}
                          >
                            <i>{row.additionalInfo}</i>
                          </FlexItem>
                        )}
                      </Flex>
                    </StackItem>
                    <StackItem style={{ fontSize: 14 }}>
                      <div style={{ whiteSpace: 'pre-line' }}>
                        {row.description}
                      </div>
                    </StackItem>
                    {row.links && (
                      <StackItem className="stack-item">
                        <Flex>
                          {row.links.map((link) => (
                            <FlexItem key={link.name}>
                              <a
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link.name}
                                <ExternalLinkAltIcon className="pf-v6-u-ml-sm" />
                              </a>
                            </FlexItem>
                          ))}
                        </Flex>
                      </StackItem>
                    )}
                  </Stack>
                </Td>
                <Td dataLabel="Status">
                  {isLoading || isRbacLoading ? (
                    <Spinner size={spinnerSize.lg} />
                  ) : (
                    <ToggleGroup aria-label="Default with single selectable">
                      <ConditionalTooltip
                        isVisible={!hasAccess && !defaults.remediations}
                        content={NO_ACCESS_TOOLTIP_CONTENT}
                      >
                        <ToggleGroupItem
                          text="Enabled"
                          isSelected={defaults.remediations}
                          onChange={() => {
                            if (!defaults.remediations) {
                              onChange({ remediations: true });
                              setConfirmChangesOpen(true);
                            }
                          }}
                          isDisabled={!hasAccess && !defaults.remediations}
                        />
                      </ConditionalTooltip>
                      <ConditionalTooltip
                        isVisible={!hasAccess && defaults.remediations}
                        content={NO_ACCESS_TOOLTIP_CONTENT}
                      >
                        <ToggleGroupItem
                          text="Disabled"
                          isSelected={!defaults.remediations}
                          onChange={() => {
                            if (defaults.remediations) {
                              onChange({ remediations: false });
                              setConfirmChangesOpen(true);
                            }
                          }}
                          isDisabled={!hasAccess && defaults.remediations}
                        />
                      </ConditionalTooltip>
                    </ToggleGroup>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </StackItem>
    </Stack>
  );
};

Services.propTypes = {
  isLoading: propTypes.bool,
  defaults: propTypes.shape({
    compliance: propTypes.bool,
    active: propTypes.bool,
    remediations: propTypes.bool,
  }),
  onChange: propTypes.func.isRequired,
  setConfirmChangesOpen: propTypes.func.isRequired,
};

export default Services;
