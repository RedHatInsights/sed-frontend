import React, { Fragment, useState, useEffect } from 'react';
import {
  Button,
  Level,
  LevelItem,
  Stack,
  StackItem,
  Switch,
  Text,
  TextContent,
  Title,
} from '@patternfly/react-core';
import { shallowEqual, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';

import pckg from '../../../package.json';
import '@patternfly/react-styles/css/components/Table/table.css';

const { routes: paths } = pckg;

const Services = ({
  setMadeChanges,
  defaults,
  onChange,
  madeChanges,
  setConfirmChangesOpen,
}) => {
  const { push } = useHistory();
  const { systemsLoaded } = useSelector(
    ({ connectedSystemsReducer }) => ({
      systemsLoaded: connectedSystemsReducer?.loaded,
    }),
    shallowEqual
  );
  const [connectToInsights, setConnectToInsights] = useState(
    defaults.hasInsights ||
      defaults.useOpenSCAP ||
      defaults.enableCloudConnector
  );
  const [useOpenSCAP, setUseOpenSCAP] = useState(defaults.useOpenSCAP);
  const [enableCloudConnector, setEnableCloudConnector] = useState(
    defaults.enableCloudConnector
  );

  useEffect(() => {
    setMadeChanges(
      connectToInsights !== defaults.hasInsights ||
        useOpenSCAP !== defaults.useOpenSCAP ||
        enableCloudConnector != defaults.enableCloudConnector
    );
    onChange({ useOpenSCAP, enableCloudConnector });
  }, [useOpenSCAP, enableCloudConnector, connectToInsights]);

  return (
    <Stack hasGutter className="pf-u-p-md">
      <StackItem>
        <Level>
          <LevelItem>
            <Title headingLevel="h2" size="2xl">
              Red Hat Insights
            </Title>
          </LevelItem>
          <LevelItem>
            <Button
              ouiaId="primary-save-button"
              isDisabled={!systemsLoaded || !madeChanges}
              onClick={() => setConfirmChangesOpen(true)}
            >
              Save changes
            </Button>
            <Button onClick={() => push(paths.logModal)} variant="link">
              View log
            </Button>
          </LevelItem>
        </Level>
        <TextContent className="pf-u-mt-md">
          <Text component="p">
            Red Hat Insights is a proactive operational efficiency and security
            risk management solution in Red Hat Enterprise Linux (RHEL)
            subscriptions for versions 6.4 and higher, as well as public cloud
            versions of RHEL. It helps identify, prioritize, and resolve risks
            to security, compliance, performance, availability, and stability
            before they become urgent issues. Insights also enables users to
            monitor for adherence to internal policies and understand
            configuration changes over time.
          </Text>
        </TextContent>
      </StackItem>
      <StackItem>
        <Title headingLevel="h3" size="xl">
          Settings
        </Title>
        <Stack hasGutter className="pf-u-mt-lg">
          <StackItem>
            <Switch
              id="connect-to-insights"
              ouiaId="connect-to-insights"
              aria-label="Connect to Red Hat Insights"
              isChecked={connectToInsights}
              onChange={() => {
                const newHasInsights = !connectToInsights;
                setConnectToInsights(() => newHasInsights);
                if (!newHasInsights) {
                  setUseOpenSCAP(() => false);
                  setEnableCloudConnector(() => false);
                }
              }}
              label={
                <Fragment>
                  <Title headingLevel="h4" size="md">
                    Connect to Red Hat Insights
                  </Title>
                  <TextContent>
                    <Text component="small">
                      Required to use Insights applications. Enables Advisor,
                      Drift, Patch, Vulnerability and Policies applications.
                    </Text>
                  </TextContent>
                </Fragment>
              }
            />
            <div className="pf-u-pl-3xl">
              <Stack>
                <StackItem>
                  <Switch
                    className="pf-u-mt-md"
                    key="use-openscap"
                    id="use-openscap"
                    ouiaId="use-openscap"
                    aria-label="Use OpenSCAP for Compliance policies"
                    isChecked={useOpenSCAP}
                    onChange={() => {
                      setUseOpenSCAP((prevValue) => {
                        const newUseOpenSCAP = !prevValue;
                        setConnectToInsights(() => true);
                        return newUseOpenSCAP;
                      });
                    }}
                    label={
                      <Fragment>
                        <Title headingLevel="h4" size="md">
                          Use OpenSCAP for Compliance policies
                        </Title>
                        <TextContent>
                          <Text component="small">
                            Required to use Compliance application
                          </Text>
                        </TextContent>
                      </Fragment>
                    }
                  />
                </StackItem>
                <StackItem>
                  <Switch
                    className="pf-u-mt-md"
                    key="enable-cloud-connector"
                    id="enable-cloud-connector"
                    ouiaId="enable-cloud-connector"
                    aria-label="Enable Cloud Connector"
                    isChecked={enableCloudConnector}
                    onChange={() => {
                      setEnableCloudConnector((prevValue) => {
                        const newEnableCloudConnector = !prevValue;
                        if (newEnableCloudConnector) {
                          setConnectToInsights(() => true);
                        }
                        return newEnableCloudConnector;
                      });
                    }}
                    label={
                      <Fragment>
                        <Title headingLevel="h4" size="md">
                          Enable Cloud Connector to fix issues directly from
                          Insights
                        </Title>
                        <TextContent>
                          <Text component="small">
                            Cloud Connector allows you to push Remediation
                            Ansible Playbooks directly from Insights to your
                            systems.
                          </Text>
                        </TextContent>
                      </Fragment>
                    }
                  />
                </StackItem>
              </Stack>
            </div>
          </StackItem>
        </Stack>
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
