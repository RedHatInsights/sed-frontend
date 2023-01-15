import React from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';
import {
  Text,
  TextContent,
  TextVariants,
  Card,
  CardActions,
  CardHeader,
  CardTitle,
  CardBody,
  Title,
} from '@patternfly/react-core';
import AdditionalRepositoriesTable from '../AdditionalRepositoriesTable';
import useAvailableRepositories from '../../hooks/useAvailableRepositories';
import EditAdditionalRepositoriesButton from '../ActivationKey/EditAdditionalRepositoriesButton';
import EditAdditionalRepositoriesModal from '../Modals/EditAdditionalRepositoriesModal';

const AdditionalRepositoriesCard = (props) => {
  const { activationKey } = props;
  const { data: availableRepositories } = useAvailableRepositories(
    activationKey.name
  );

  const [
    isEditAdditionalRepositoriesModalOpen,
    setisEditAdditionalRepositoriesModalOpen,
  ] = useState(false);

  const handleEditAdditionalRepositoriesToggle = () => {
    setisEditAdditionalRepositoriesModalOpen(
      !isEditAdditionalRepositoriesModalOpen
    );
  };

  const ButtonWrapper = () => {
    return (
      <EditAdditionalRepositoriesButton
        onClick={handleEditAdditionalRepositoriesToggle}
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Title headingLevel="h2"> Additional repositories</Title>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <TextContent>
          <Text component={TextVariants.p}>
            The core repositories for your operating system version, for example
            BaseOS and AppStream, are always enabled and do not need to be
            explicitly added to the activation key.
          </Text>
          <CardActions>
            <ButtonWrapper />
          </CardActions>
          <EditAdditionalRepositoriesModal
            title="Additional Repositories"
            isOpen={isEditAdditionalRepositoriesModalOpen}
            handleModalToggle={handleEditAdditionalRepositoriesToggle}
            modalSize="large"
            repositories={availableRepositories}
          />
        </TextContent>
        <AdditionalRepositoriesTable
          repositories={activationKey.availableRepositories}
        />
      </CardBody>
    </Card>
  );
};

AdditionalRepositoriesCard.propTypes = {
  activationKey: propTypes.object,
};

export default AdditionalRepositoriesCard;
