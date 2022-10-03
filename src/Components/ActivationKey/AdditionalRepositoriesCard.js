import React from 'react';
import {
  Text,
  TextContent,
  TextVariants,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from '@patternfly/react-core';
import propTypes from 'prop-types';
import AdditionalRepositoriesTable from '../AdditionalRepositoriesTable';

const AdditionalRepositoriesCard = (props) => {
  const { activationKey } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Additional repositories</CardTitle>
      </CardHeader>
      <CardBody>
        <TextContent>
          <Text component={TextVariants.p}>
            The core repositories for your operating system version, for example
            BaseOS and AppStream, are always enabled and do not need to be
            explicitly added to the activation key.
          </Text>
        </TextContent>
        <AdditionalRepositoriesTable
          repositories={activationKey.additionalRepositories}
        />
      </CardBody>
    </Card>
  );
};

AdditionalRepositoriesCard.propTypes = {
  activationKey: propTypes.object,
};

export default AdditionalRepositoriesCard;
