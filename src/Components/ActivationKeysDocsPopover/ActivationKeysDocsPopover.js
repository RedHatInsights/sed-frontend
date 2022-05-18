import React from 'react';
import {
  Button,
  Popover,
  PopoverPosition,
  Text,
  TextContent,
} from '@patternfly/react-core';
import propTypes from 'prop-types';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';

const ActivationKeysDocsPopover = (props) => {
  const { orgId } = props;
  return (
    <Popover
      headerContent="Activation Keys"
      position={PopoverPosition.rightStart}
      bodyContent={
        <TextContent>
          <Text>
            Activation keys assist you in registering systems. Metadata such as
            role, system purpose, and usage can be automatically attached to
            systems via an activation key, and monitored with
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={'https://console.redhat.com/insights/subscriptions/rhel'}
            >
              {' '}
              Subscription Watch.
            </a>
          </Text>
          <Text>
            To register with an activation key, you will need your organization
            ID: <b>{orgId}</b>
          </Text>
        </TextContent>
      }
    >
      <Button variant="plain" isInline style={{ padding: 0 }}>
        <OutlinedQuestionCircleIcon />
      </Button>
    </Popover>
  );
};

export default ActivationKeysDocsPopover;

ActivationKeysDocsPopover.propTypes = {
  orgId: propTypes.string.isRequired,
};
