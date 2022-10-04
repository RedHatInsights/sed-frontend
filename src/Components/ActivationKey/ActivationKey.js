import React from 'react';
import { withRouter, useParams } from 'react-router-dom';
import pckg from '../../../package.json';
import Breadcrumbs from '../shared/breadcrumbs';
const { routes: paths } = pckg;
import {
  Text,
  TextContent,
  TextVariants,
  Grid,
  GridItem,
  Gallery,
  GalleryItem,
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
import { useQueryClient } from 'react-query';

const ActivationKey = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const { id } = useParams();
  const breadcrumbs = [
    { title: 'Activation Keys', to: paths.activationKeys },
    { title: id, isActive: true },
  ];
  const {
    isLoading: isKeyLoading,
    error: keyError,
    data: activationKey,
  } = useActivationKey(id);
  const description =
    'View and edit details and repositories for this activation key.';

  const Page = () => {
    return (
      <React.Fragment>
        <PageHeader>
          <Breadcrumbs {...breadcrumbs} />
          <PageHeaderTitle title={id} />
          <TextContent>
            <Text component={TextVariants.p}>{description}</Text>
          </TextContent>
        </PageHeader>
        {isKeyLoading && !keyError ? (
          <Loading />
        ) : (
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
                    <SystemPurposeCard activationKey={activationKey} />
                  </GalleryItem>
                  <GalleryItem>
                    <WorkloadCard activationKey={activationKey} />
                  </GalleryItem>
                </Gallery>
              </GridItem>
              <GridItem span={12}>
                <AdditionalRepositoriesCard activationKey={activationKey} />
              </GridItem>
            </Grid>
          </Main>
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
