import React from 'react';
import {
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import ActivationKeysTable from '../ActivationKeysTable';
import { useQueryClient } from 'react-query';
import NoAccessView from './no-access';

const ActivationKeys = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('user');
  const Page = () => {
    return (
      <React.Fragment>
        <PageHeader>
          <PageHeaderTitle
            title={
              <Stack>
                <StackItem>Activation Keys</StackItem>
                <StackItem isFilled>
                  <TextContent>
                    <Text component={TextVariants.h6}>
                      Organization ID: {user.orgId}
                    </Text>
                  </TextContent>
                </StackItem>
              </Stack>
            }
          />
        </PageHeader>
        <Main>
          <ActivationKeysTable />
        </Main>
      </React.Fragment>
    );
  };

  if (user.rbacPermissions.canReadActivationKeys) {
    return <Page />;
  } else {
    return <NoAccessView />;
  }
};

export default ActivationKeys;
