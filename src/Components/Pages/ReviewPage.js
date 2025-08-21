import React from 'react';
import {
  Title,
  Content,
  ContentVariants,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
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
      <Content component={ContentVariants.p} className="pf-v5-u-mb-xl">
        Review the following information and click <b>Create</b> to create the
        activation key.
      </Content>
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
            <Content>
              <Content component="p">{workload}</Content>
              {workload.includes('Extended') && (
                <>
                  <Content component="p">{extendedReleaseProduct}</Content>
                  <Content component="p">{extendedReleaseVersion}</Content>
                </>
              )}
            </Content>
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
