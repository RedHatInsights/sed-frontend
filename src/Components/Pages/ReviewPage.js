import React from 'react';
import {
  Title,
  Text,
  TextVariants,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  TextContent,
} from '@patternfly/react-core';
import Loading from '../LoadingState/Loading';
import PropTypes from 'prop-types';

const ReviewPage = ({
  name,
  workload,
  role,
  sla,
  usage,
  isLoading,
  extendedReleaseProduct,
  extendedReleaseVersion,
}) => {
  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Title headingLevel="h2" className="pf-v5-u-mb-sm">
        Review
      </Title>
      <Text component={TextVariants.p} className="pf-v5-u-mb-xl">
        Review the following information and click <b>Create</b> to create the
        activation key.
      </Text>
      <DescriptionList
        isHorizontal
        horizontalTermWidthModifier={{
          default: '21ch',
        }}
      >
        <DescriptionListGroup>
          <DescriptionListTerm>Name</DescriptionListTerm>
          <DescriptionListDescription>{name}</DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Workload</DescriptionListTerm>
          <DescriptionListDescription>
            <TextContent>
              <Text component="p">{workload}</Text>
              {workload.includes('Extended') && (
                <>
                  <Text component="p">{extendedReleaseProduct}</Text>
                  <Text component="p">{extendedReleaseVersion}</Text>
                </>
              )}
            </TextContent>
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Role</DescriptionListTerm>
          <DescriptionListDescription>
            {role || 'Not defined'}
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>
            Service level agreement (SLA)
          </DescriptionListTerm>
          <DescriptionListDescription>
            {sla || 'Not defined'}
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>Usage</DescriptionListTerm>
          <DescriptionListDescription>
            {usage || 'Not defined'}
          </DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
    </>
  );
};

ReviewPage.propTypes = {
  name: PropTypes.string.isRequired,
  workload: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  sla: PropTypes.string.isRequired,
  usage: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  extendedReleaseProduct: PropTypes.string.isRequired,
  extendedReleaseVersion: PropTypes.string.isRequired,
};

export default ReviewPage;
