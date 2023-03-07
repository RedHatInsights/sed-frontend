import React from 'react';
import {
  Button,
  Popover,
  PopoverPosition,
  Text,
  TextContent,
} from '@patternfly/react-core';
import {
  OutlinedQuestionCircleIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons';

import { RegisterWithActivationKey } from '../FormGroups';

const ConnectSystemsModal = () => {
  return (
    <Popover
      headerContent="About Remote Host Configuration Manager"
      className="connector pf-u-color-100"
      position={PopoverPosition.rightStart}
      bodyContent={
        <TextContent className="pf-u-font-size-sm">
          <Text>
            Remote host configuration (rhc) allows you to register with Red Hat
            Subscription Management (RHSM), connect to Red Hat Insights, and
            manage your Insights connections with one command.
            <br /> rhc can enable Cloud Connector on supported configurations to
            allow for remediation of Insights issues directly from
            console.redhat.com.
            <br />
          </Text>
          <Text>
            Remote host configuration connects RHEL 7.9+ and 8.4+ systems. To
            register other systems with RHSM or Insights, check out the{' '}
            <Text
              href="./insights/registration"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
            >
              Registration Assistant
            </Text>
            .
          </Text>
          <div className="pf-c-form pf-u-pb-lg">
            <RegisterWithActivationKey />
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              'https://access.redhat.com/documentation/en-us/red_hat_insights/2023/html/remote_host_configuration_and_management/index'
            }
          >
            Connecting with Red Hat
            {<ExternalLinkAltIcon className="pf-u-ml-sm" />}
          </a>
        </TextContent>
      }
    >
      <Button variant="plain" isInline style={{ padding: 0 }}>
        <OutlinedQuestionCircleIcon />
      </Button>
    </Popover>
  );
};

export default ConnectSystemsModal;
