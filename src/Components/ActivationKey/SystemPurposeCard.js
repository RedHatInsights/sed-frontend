import React from 'react';
import {
  TextContent,
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

const SystemPurposeCard = (props) => {
  const { activationKey } = props;
  const notDefinedText = 'Not defined';
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Title headingLevel="h2">System Purpose</Title>
        </CardTitle>
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
};

export default SystemPurposeCard;
