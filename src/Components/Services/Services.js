import React from 'react';
import {
  Alert,
  Stack,
  StackItem,
  FlexItem,
  Flex,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import propTypes from 'prop-types';
import { Table, Thead, Tr, Th, Tbody, Td } from '@patternfly/react-table';

import { permissions } from './permissionsConfig';

import useFeatureFlag from '../../hooks/useFeatureFlag';

const Services = () => {
  const isLightspeedRebrandEnabled = useFeatureFlag(
    'platform.lightspeed-rebrand'
  );

  return (
    <>
      <Stack hasGutter>
        <StackItem>
          <Alert
            variant="warning"
            isInline
            title="RHC Manager is being decommissioned"
          >
            To manage remote execution capabilities at the host level, install
            or remove rhc-worker-playbook.
          </Alert>
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
                  key={
                    isLightspeedRebrandEnabled ? row.nameLigthspeed : row.name
                  }
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
                  <Td dataLabel="Status">N/A</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </StackItem>
      </Stack>
    </>
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
