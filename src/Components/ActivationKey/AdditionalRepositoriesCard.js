import React from 'react';
import { useState } from 'react';
import propTypes from 'prop-types';
import {
  Text,
  TextContent,
  TextVariants,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Title,
} from '@patternfly/react-core';
import AdditionalRepositoriesTable from '../AdditionalRepositoriesTable';
import useAvailableRepositories from '../../hooks/useAvailableRepositories';
import EditAdditionalRepositoriesButton from '../ActivationKey/EditAdditionalRepositoriesButton';
import EditAdditionalRepositoriesModal from '../Modals/EditAdditionalRepositoriesModal';
import Loading from '../LoadingState/Loading';
import Unavailable from '@redhat-cloud-services/frontend-components/Unavailable';

const AdditionalRepositoriesCard = (props) => {
  const { activationKey, isLoading, error } = props;
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
  const AdditionalReposCard = () => {
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
              The core repositories for your operating system version, for
              example BaseOS and AppStream, are always enabled and do not need
              to be explicitly added to the activation key.
            </Text>
            <EditAdditionalRepositoriesButton
              onClick={handleEditAdditionalRepositoriesToggle}
            />
            <EditAdditionalRepositoriesModal
              title="Additional Repositories"
              isOpen={isEditAdditionalRepositoriesModalOpen}
              handleModalToggle={handleEditAdditionalRepositoriesToggle}
              modalSize="large"
              repositories={availableRepositories}
              isLoading={isLoading}
              error={error}
            />
          </TextContent>
          <AdditionalRepositoriesTable
            repositories={activationKey.availableRepositories}
          />
        </CardBody>
      </Card>
    );
  };
  if (isLoading && !error) {
    return <Loading />;
  } else if (!isLoading && !error) {
    return AdditionalReposCard();
  } else {
    return <Unavailable />;
  }
};

AdditionalRepositoriesCard.propTypes = {
  activationKey: propTypes.object,
  isLoading: propTypes.func,
  error: propTypes.func,
};

export default AdditionalRepositoriesCard;
