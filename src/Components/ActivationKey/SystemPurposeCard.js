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
import EditButton from './EditButton';
import propTypes from 'prop-types';
import ActivationKeysDocsPopover from '../ActivationKeysDocsPopover';
import NoAccessPopover from '../NoAccessPopover';
import { useQueryClient } from '@tanstack/react-query';

const SystemPurposeCard = (props) => {
  const { activationKey, actionHandler } = props;
  const notDefinedText = 'Not defined';
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']);

  const ButtonWrapper = () => {
    return <EditButton onClick={actionHandler} />;
  };

  const docsPopoverContent = (
    <Content>
      <Content component="p">
        System purpose values are used by the subscriptions service to help
        filter and identify hosts. Setting values for these attributes is
        optional, but doing so ensures that subscriptions reporting accurately
        reflects the system.
      </Content>
    </Content>
  );
  return (
    <Card>
      <CardHeader
        actions={{
          actions: (
            <>
              {user.rbacPermissions.canWriteActivationKeys ? (
                <ButtonWrapper />
              ) : (
                <NoAccessPopover content={ButtonWrapper} />
              )}
            </>
          ),
          hasNoOffset: false,
          className: 'SystemPurposeCardHeader',
        }}
      >
        <CardTitle>
          <Title headingLevel="h2">
            System Purpose{' '}
            <ActivationKeysDocsPopover
              popoverContent={docsPopoverContent}
              position="top"
            />{' '}
          </Title>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Content>
          <Content component={ContentVariants.dl}>
            <Content component={ContentVariants.dt}>
              Role
            </Content>
            <Content component={ContentVariants.dd}>
              {activationKey && activationKey.role
                ? activationKey.role
                : notDefinedText}
            </Content>
            <Content component={ContentVariants.dt}>SLA</Content>
            <Content component={ContentVariants.dd}>
              {activationKey && activationKey.serviceLevel
                ? activationKey.serviceLevel
                : notDefinedText}
            </Content>
            <Content component={ContentVariants.dt}>
              Usage
            </Content>
            <Content component={ContentVariants.dd}>
              {activationKey && activationKey.usage
                ? activationKey.usage
                : notDefinedText}
            </Content>
          </Content>
        </Content>
      </CardBody>
    </Card>
  );
};

SystemPurposeCard.propTypes = {
  activationKey: propTypes.object,
  actionHandler: propTypes.func,
};

export default SystemPurposeCard;
