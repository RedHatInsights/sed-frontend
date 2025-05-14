import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumbs from '../shared/breadcrumbs';
import {
  Text,
  TextContent,
  TextVariants,
  Grid,
  GridItem,
  Gallery,
  GalleryItem,
  Level,
  LevelItem,
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import AdditionalRepositoriesCard from './AdditionalRepositoriesCard';
import useActivationKey from '../../hooks/useActivationKey';
import Loading from '../LoadingState/Loading';
import SystemPurposeCard from './SystemPurposeCard';
import WorkloadCard from './WorkloadCard';
import DeleteButton from './DeleteButton';
import DeleteActivationKeyConfirmationModal from '../Modals/DeleteActivationKeyConfirmationModal';
import EditActivationKeyModal from '../Modals/EditActivationKeyModal';
import NoAccessPopover from '../NoAccessPopover';
import { EditReleaseVersionModal } from '../Modals/EditReleaseVersionModal';
import useReleaseVersions from '../../hooks/useReleaseVersions';
import { usePermissionsWithContext } from '@redhat-cloud-services/frontend-components-utilities/RBACHook';

const ActivationKey = () => {
  const navigate = useNavigate();
  const { hasAccess: canWriteActivationKeys } = usePermissionsWithContext([
    'config-manager:activation_keys:write',
  ]);
  const { id } = useParams();
  const breadcrumbs = [
    { title: 'Activation Keys', to: '../activation-keys' },
    { title: id, isActive: true },
  ];
  const {
    isLoading: isKeyLoading,
    error: keyError,
    data: activationKey,
  } = useActivationKey(id);
  const { isLoading: areReleaseVersionsLoading, data: releaseVersions } =
    useReleaseVersions();

  const description =
    'View and edit details and repositories for this activation key.';
  const [isDeleteActivationKeyModalOpen, setIsDeleteActivationKeyModalOpen] =
    useState(false);
  const [isEditActivationKeyModalOpen, setIsEditActivationKeyModalOpen] =
    useState(false);
  const [isEditReleaseVersionModalOpen, setIsEditReleaseVersionModalOpen] =
    useState(false);
  const handleDeleteActivationKeyModalToggle = (keyDeleted) => {
    setIsDeleteActivationKeyModalOpen(!isDeleteActivationKeyModalOpen);
    if (keyDeleted === true) {
      navigate('../activation-keys');
    }
  };

  const handleEditActivationKeyModalToggle = () => {
    setIsEditActivationKeyModalOpen(!isEditActivationKeyModalOpen);
  };

  const handleEditReleaseVersionModalToggle = () => {
    setIsEditReleaseVersionModalOpen(!isEditReleaseVersionModalOpen);
  };

  const editModalDescription =
    'System purpose values are used by the subscriptions service to help filter and identify hosts. Setting values for these attributes is optional, but doing so ensures that subscriptions reporting accurately reflects the system. Only those values available to your account are shown.';

  return (
    <React.Fragment>
      <PageHeader>
        <Level>
          <LevelItem>
            <Breadcrumbs {...breadcrumbs} />
            <PageHeaderTitle title={id} />
            <TextContent>
              <Text component={TextVariants.p}>{description}</Text>
            </TextContent>
          </LevelItem>
          <LevelItem>
            {canWriteActivationKeys ? (
              <DeleteButton onClick={handleDeleteActivationKeyModalToggle} />
            ) : (
              <NoAccessPopover content={DeleteButton} />
            )}
          </LevelItem>
        </Level>
      </PageHeader>
      {isKeyLoading && !keyError ? (
        <Loading />
      ) : (
        <React.Fragment>
          <Main>
            <Grid hasGutter>
              <GridItem span={12}>
                <Gallery
                  hasGutter
                  minWidths={{
                    default: '40%',
                  }}
                >
                  <GalleryItem>
                    <SystemPurposeCard
                      activationKey={activationKey}
                      actionHandler={handleEditActivationKeyModalToggle}
                    />
                  </GalleryItem>
                  <GalleryItem>
                    <WorkloadCard
                      activationKey={activationKey}
                      actionHandler={handleEditReleaseVersionModalToggle}
                    />
                  </GalleryItem>
                </Gallery>
              </GridItem>
              <GridItem span={12}>
                <AdditionalRepositoriesCard
                  activationKey={activationKey}
                  actionHandler={handleEditActivationKeyModalToggle}
                />
              </GridItem>
            </Grid>
          </Main>
        </React.Fragment>
      )}
      <DeleteActivationKeyConfirmationModal
        handleModalToggle={handleDeleteActivationKeyModalToggle}
        isOpen={isDeleteActivationKeyModalOpen}
        name={id}
      />
      <EditActivationKeyModal
        title="Edit system purpose"
        description={editModalDescription}
        isOpen={isEditActivationKeyModalOpen}
        handleModalToggle={handleEditActivationKeyModalToggle}
        activationKeyName={id}
        systemPurposeOnly={true}
        modalSize="small"
      />
      <EditReleaseVersionModal
        isOpen={isEditReleaseVersionModalOpen}
        onClose={handleEditReleaseVersionModalToggle}
        releaseVersions={releaseVersions}
        areReleaseVersionsLoading={areReleaseVersionsLoading}
        activationKey={activationKey}
      />
    </React.Fragment>
  );
};

export default ActivationKey;
