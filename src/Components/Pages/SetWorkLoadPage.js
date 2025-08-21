import React, { useEffect } from 'react';
import {
  Title,
  Content,
  ContentVariants,
  Radio,
  Spinner,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
  Tooltip,
  } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import useEusVersions from '../../hooks/useEusVersions';

const SetWorkloadPage = ({
  workloadOptions,
  workload,
  setWorkload,
  extendedReleaseProduct,
  setExtendedReleaseProduct,
  extendedReleaseVersion,
  setExtendedReleaseVersion,
  setExtendedReleaseRepositories,
}) => {
  const { isLoading, error, data } = useEusVersions();

  useEffect(() => {
    if (workload.includes('Extended') && data) {
      setExtendedReleaseProduct(extendedReleaseProduct || data[0].name);
      setExtendedReleaseVersion(
        extendedReleaseVersion || data[0].configurations[0].version
      );
    } else {
      setExtendedReleaseProduct('');
      setExtendedReleaseVersion('');
    }
  }, [data, workload]);

  useEffect(() => {
    if (data && workload.includes('Extended')) {
      setExtendedReleaseRepositories(
        data
          .find((product) => extendedReleaseProduct == product.name)
          .configurations.find(
            (configuration) => extendedReleaseVersion == configuration.version
          ).repositories
      );
    } else {
      setExtendedReleaseRepositories([]);
    }
  }, [data, extendedReleaseProduct, extendedReleaseVersion]);

  return (
    <>
      <Title headingLevel="h2" className="pf-v5-u-mb-sm">
        Select Workload
      </Title>
      <Content component={ContentVariants.p} className="pf-v5-u-mb-xl">
        Choose a workload option to associate an appropriate selection of
        repositories to the activation key. Repositories can be edited on the
        activation key detail page.{' '}
      </Content>
      {!isLoading ? (
        workloadOptions.map((wl, i) => {
          const isDisabled = i == 1 && error == 400;

          const button = (
            <Radio
              label={wl}
              onChange={() => setWorkload(wl)}
              isChecked={wl == workload}
              className="pf-v5-u-mb-md"
              name={wl}
              id={wl}
              isDisabled={isDisabled}
              key={wl}
            />
          );

          return (
            <Tooltip
              key={i}
              content={
                isDisabled ? (
                  'Your account has no extended support subscriptions'
                ) : i == 0 ? (
                  'Activation key will use the latest RHEL release'
                ) : (
                  <Content>
                    <Content
                      className="pf-v5-u-color-light-100"
                      component={ContentVariants.small}
                    >
                      Activation key can be version locked to a specific version
                      of RHEL. You can only version lock an activation key to a
                      RHEL release that has the option of Extended Update
                      Support (EUS). For more information please refer to:{' '}
                      <a
                        href="https://access.redhat.com/articles/rhel-eus#c9"
                        target="_blank"
                        rel="noreferrer"
                      >
                        https://access.redhat.com/articles/rhel-eus#c9
                      </a>
                    </Content>
                  </Content>
                )
              }
              position="left"
            >
              {button}
            </Tooltip>
          );
        })
      ) : (
        <Spinner />
      )}

      {workload === workloadOptions[1] && (
        <Form>
          <FormGroup label="Product">
            <FormSelect
              onChange={(_event, v) => setExtendedReleaseProduct(v)}
              value={extendedReleaseProduct}
              id="product"
            >
              {data.map((product, i) => {
                return (
                  <FormSelectOption
                    key={i}
                    value={product.name}
                    label={product.name}
                  />
                );
              })}
            </FormSelect>
          </FormGroup>
          <FormGroup label="Version">
            <FormSelect
              onChange={(_event, v) => setExtendedReleaseVersion(v)}
              value={extendedReleaseVersion}
              id="version"
            >
              {data
                .find((product) => product.name == extendedReleaseProduct)
                ?.configurations.map((configuration, i) => {
                  return (
                    <FormSelectOption
                      key={i}
                      value={configuration.version}
                      label={configuration.version}
                    />
                  );
                })}
            </FormSelect>
          </FormGroup>
        </Form>
      )}
    </>
  );
};

SetWorkloadPage.propTypes = {
  workloadOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  workload: PropTypes.string.isRequired,
  setWorkload: PropTypes.func.isRequired,
  extendedReleaseProduct: PropTypes.string.isRequired,
  setExtendedReleaseProduct: PropTypes.func.isRequired,
  extendedReleaseVersion: PropTypes.string.isRequired,
  setExtendedReleaseVersion: PropTypes.func.isRequired,
  setExtendedReleaseRepositories: PropTypes.func.isRequired,
};

export default SetWorkloadPage;
