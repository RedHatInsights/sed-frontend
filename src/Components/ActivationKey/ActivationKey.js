import React, { useState } from 'react';
import { withRouter, useParams, useHistory } from 'react-router-dom';
import pckg from '../../../package.json';
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
import NoAccessView from '../ActivationKeys/no-access';
import DeleteButton from './DeleteButton';
import DeleteActivationKeyConfirmationModal from '../Modals/DeleteActivationKeyConfirmationModal';
import EditActivationKeyModal from '../Modals/EditActivationKeyModal';
import NoAccessPopover from '../NoAccessPopover';
import { useQueryClient } from 'react-query';
import { EditReleaseVersionModal } from '../Modals/EditReleaseVersionModal';
import useReleaseVersions from '../../hooks/useReleaseVersions';

const ActivationKey = () => {
  const history = useHistory();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const { id } = useParams();
  const { routes: paths } = pckg;
  const breadcrumbs = [
    { title: 'Activation Keys', to: paths.activationKeys },
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
      history.push('/activation-keys');
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

  const Page = () => {
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
              {user.rbacPermissions.canWriteActivationKeys ? (
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
        )}
      </React.Fragment>
    );
  };

  if (user.rbacPermissions.canReadActivationKeys) {
    return <Page />;
  } else {
    return <NoAccessView />;
  }
};

export default withRouter(ActivationKey);
