import React from 'react';
import {
  TextContent,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  TextList,
  Text,
  TextListVariants,
  TextListItem,
  TextListItemVariants,
  Title,
  CardActions,
} from '@patternfly/react-core';
import EditButton from './EditButton';
import propTypes from 'prop-types';
import ActivationKeysDocsPopover from '../ActivationKeysDocsPopover';

const SystemPurposeCard = (props) => {
  const { activationKey, actionHandler } = props;
  const notDefinedText = 'Not defined';
  const docsPopoverContent = (
    <TextContent>
      <Text>
        System purpose values are used by the subscriptions service to help
        filter and identify hosts. Setting values for these attributes is
        optional, but doing so ensures that subscriptions reporting accurately
        reflects the system.
      </Text>
    </TextContent>
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Title headingLevel="h2">
            System Purpose{' '}
            <ActivationKeysDocsPopover
              popoverContent={docsPopoverContent}
              position="top"
            />{' '}
          </Title>
        </CardTitle>
        <CardActions>
          {user.rbacPermissions.canWriteActivationKeys ? (
            <ButtonWrapper />
          ) : (
            <NoAccessPopover content={ButtonWrapper} />
          )}
        </CardActions>
      </CardHeader>
      <CardBody>
        <TextContent>
          <TextList component={TextListVariants.dl}>
            <TextListItem component={TextListItemVariants.dt}>
              Role
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {activationKey && activationKey.role
                ? activationKey.role
                : notDefinedText}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>SLA</TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {activationKey && activationKey.serviceLevel
                ? activationKey.serviceLevel
                : notDefinedText}
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
              Usage
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              {activationKey && activationKey.usage
                ? activationKey.usage
                : notDefinedText}
            </TextListItem>
          </TextList>
        </TextContent>
      </CardBody>
    </Card>
  );
};

SystemPurposeCard.propTypes = {
  activationKey: propTypes.object,
  actionHandler: propTypes.func,
};

export default SystemPurposeCard;
