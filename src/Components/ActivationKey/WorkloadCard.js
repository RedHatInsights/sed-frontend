import React from 'react';
import {
  Content,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  ContentVariants,
  Title,
} from '@patternfly/react-core';
import propTypes from 'prop-types';
import ActivationKeysDocsPopover from '../ActivationKeysDocsPopover';
import EditButton from './EditButton';

const WorkloadCard = (props) => {
  const { activationKey, actionHandler } = props;
  const notDefinedText = 'Not defined';
  const docsPopoverContent = (
    <Content>
      <Content component="p">
        A release version enables you to configure your system to use a specific
        minor release of Red Hat Enterprise Linux. Setting a release version is
        useful if you are using an extended release of software, such as
        Extended Update Support. Most users will not set a release version.
      </Content>
    </Content>
  );
  return (
    <Card style={{ minHeight: '100%' }}>
      <CardHeader
        actions={{
          actions: (
            <>
              <EditButton onClick={actionHandler} />
            </>
          ),
          hasNoOffset: false,
          className: 'WorkloadCardHeader',
        }}
      >
        <CardTitle>
          <Title headingLevel="h2">
            Workload{' '}
            <ActivationKeysDocsPopover
              popoverContent={docsPopoverContent}
              position="top"
            />
          </Title>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Content>
          <Content component={ContentVariants.dl}>
            <Content component={ContentVariants.dt}>Release version</Content>
            <Content component={ContentVariants.dd}>
              {activationKey && activationKey.releaseVersion
                ? activationKey.releaseVersion
                : notDefinedText}
            </Content>
          </Content>
        </Content>
      </CardBody>
    </Card>
  );
};

WorkloadCard.propTypes = {
  activationKey: propTypes.object,
  actionHandler: propTypes.func,
};

export default WorkloadCard;
