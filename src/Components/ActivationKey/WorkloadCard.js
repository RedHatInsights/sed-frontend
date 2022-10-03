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
} from '@patternfly/react-core';
import propTypes from 'prop-types';

const WorkloadCard = (props) => {
  const { activationKey } = props;
  const notDefinedText = 'Not defined';
  return (
    <Card style={{ minHeight: '100%' }}>
      <CardHeader>
        <CardTitle>Workload</CardTitle>
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
};

export default WorkloadCard;
