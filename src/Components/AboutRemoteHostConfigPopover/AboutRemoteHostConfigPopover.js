import React from 'react';
import {
  Button,
  Popover,
  PopoverPosition,
  Content,
} from '@patternfly/react-core';
import {
  OutlinedQuestionCircleIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons';

import { RegisterWithActivationKey } from '../FormGroups';
import useFeatureFlag from '../../hooks/useFeatureFlag';

const ConnectSystemsModal = () => {
  const isLightspeedRebrandEnabled = useFeatureFlag(
    'platform.lightspeed-rebrand'
  );

  return (
    <Popover
      headerContent="About Remote Host Configuration Manager"
      className="connector"
      position={PopoverPosition.rightStart}
      bodyContent={
        <Content className="pf-v6-u-font-size-sm">
          <Content component="p">
            Remote host configuration (rhc) allows you to register with Red Hat
            Subscription Management (RHSM), connect to Red Hat{' '}
            {isLightspeedRebrandEnabled ? 'Lightspeed' : 'Insights'}, and manage
            your{' '}
            {isLightspeedRebrandEnabled ? 'Red Hat Lightspeed' : 'Insights'}{' '}
            connections with one command.
            <br /> rhc can enable Cloud Connector on supported configurations to
            allow for remediation of{' '}
            {isLightspeedRebrandEnabled
              ? 'Red Hat Lightspeed'
              : 'Insights'}{' '}
            issues directly from console.redhat.com.
            <br />
          </Content>
          <Content component="p">
            Remote host configuration connects RHEL 7.9+ and 8.4+ systems. To
            register other systems with RHSM or{' '}
            {isLightspeedRebrandEnabled ? 'Red Hat Lightspeed' : 'Insights'},
            check out the{' '}
            <Content
              href="./insights/registration"
              component="a"
              target="_blank"
              rel="noopener noreferrer"
            >
              Registration Assistant
            </Content>
            .
          </Content>
          <div className="pf-v6-c-form pf-v6-u-pb-lg">
            <RegisterWithActivationKey />
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={
              'https://docs.redhat.com/en/documentation/red_hat_lightspeed/1-latest/html/remote_host_configuration_and_management/index'
            }
          >
            Connecting with Red Hat
            {<ExternalLinkAltIcon className="pf-v6-u-ml-sm" />}
          </a>
        </Content>
      }
    >
      <Button
        icon={<OutlinedQuestionCircleIcon />}
        variant="plain"
        isInline
        style={{ padding: 0 }}
      />
    </Popover>
  );
};

export default ConnectSystemsModal;
