import React, { useEffect } from 'react';
import {
  Title,
  Text,
  TextVariants,
  Radio,
  Spinner,
  Form,
  FormGroup,
  FormSelect,
  FormSelectOption,
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
      <Title headingLevel="h2" className="pf-u-mb-sm">
        Select Workload
      </Title>
      <Text component={TextVariants.p} className="pf-u-mb-xl">
        Choose a workload option to associate an appropriate selection of
        repositories to the activation key. Repositories can be edited on the
        activation key detail page.{' '}
      </Text>
      {!isLoading ? (
        workloadOptions.map((wl) => {
          return (
            <Radio
              label={wl}
              onChange={() => setWorkload(wl)}
              isChecked={wl == workload}
              className="pf-u-mb-md"
              name={wl}
              id={wl}
              isDisabled={wl == 'Extended support' && error == 400}
              key={wl}
            />
          );
        })
      ) : (
        <Spinner />
      )}

      {workload === 'Extended support' && (
        <Form>
          <FormGroup label="Product">
            <FormSelect
              onChange={(v) => setExtendedReleaseProduct(v)}
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
              onChange={(v) => setExtendedReleaseVersion(v)}
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
