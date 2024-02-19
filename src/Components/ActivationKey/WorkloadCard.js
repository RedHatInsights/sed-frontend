import React from 'react';
import {
  TextContent,
  Text,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  TextList,
  TextListVariants,
  TextListItem,
  TextListItemVariants,
  Title,
} from '@patternfly/react-core';
import propTypes from 'prop-types';
import ActivationKeysDocsPopover from '../ActivationKeysDocsPopover';
import EditButton from './EditButton';

const WorkloadCard = (props) => {
  const { activationKey, actionHandler } = props;
  const notDefinedText = 'Not defined';
  const docsPopoverContent = (
    <TextContent>
      <Text>
        A release version enables you to configure your system to use a specific
        minor release of Red Hat Enterprise Linux. Setting a release version is
        useful if you are using an extended release of software, such as
        Extended Update Support. Most users will not set a release version.
      </Text>
    </TextContent>
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
        <TextContent>
          <TextList component={TextListVariants.dl}>
            <TextListItem component={TextListItemVariants.dt}>
              Release version
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {activationKey && activationKey.releaseVersion
                ? activationKey.releaseVersion
                : notDefinedText}
            </TextListItem>
          </TextList>
        </TextContent>
      </CardBody>
    </Card>
  );
};

WorkloadCard.propTypes = {
  activationKey: propTypes.object,
  actionHandler: propTypes.func,
};

export default WorkloadCard;
