import {
  Flex,
  FlexItem,
  Stack,
  StackItem,
  PageSection,
} from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import React, { lazy, useEffect } from 'react';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import Services from '../../Components/Services/Services';
import './dashboard.scss';

const AboutRemoteHostConfigPopover = lazy(() =>
  import(
    /* webpackChunkName: "ConnectSysAboutRemoteHostConfigPopovertemsModal" */ '../../Components/AboutRemoteHostConfigPopover/AboutRemoteHostConfigPopover'
  )
);

const SamplePage = () => {
  const { updateDocumentTitle } = useChrome();
  updateDocumentTitle?.(
    'Remote Host Configuration - System Configuration | RHEL',
    true
  );

  useEffect(() => {
    insights?.chrome?.appAction?.('cloud-connector-dashboard');
  }, []);

  return (
    <React.Fragment>
      <PageHeader className="page-header">
        <div>
          <div className="page-title">
            <Flex alignItems={{ default: 'alignItemsStretch' }}>
              <FlexItem spacer={{ default: 'spacerNone' }}>
                <PageHeaderTitle title="Remote Host Configuration Manager" />
              </FlexItem>
              <FlexItem alignSelf={{ default: 'alignSelfCenter' }}>
                <AboutRemoteHostConfigPopover />
              </FlexItem>
            </Flex>
          </div>
          <Stack hasGutter>
            <StackItem>
              Selections here affect Red Hat Enterprise Linux (RHEL) systems
              connected to Red Hat with remote host configuration (rhc).
            </StackItem>
            <StackItem>
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
            </StackItem>
          </Stack>
        </div>
      </PageHeader>
      <PageSection>
        <div className="dashboard__content">
          <Services />
        </div>
      </PageSection>
    </React.Fragment>
  );
};

export default SamplePage;
