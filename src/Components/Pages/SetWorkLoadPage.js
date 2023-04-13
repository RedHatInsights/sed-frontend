import React from 'react';
import { Title, Text, TextVariants, Radio } from '@patternfly/react-core';
import PropTypes from 'prop-types';

const SetWorkloadPage = ({ workloadOptions, workload, setWorkload }) => {
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
      {workloadOptions.map((wl) => {
        return (
          <Radio
            label={wl}
            onChange={() => setWorkload(wl)}
            isChecked={wl == workload}
            className="pf-u-mb-md"
            name={wl}
            id={wl}
            isDisabled={wl == 'Extended support'}
            key={wl}
          />
        );
      })}
    </>
  );
};

SetWorkloadPage.propTypes = {
  workloadOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  workload: PropTypes.string.isRequired,
  setWorkload: PropTypes.func.isRequired,
};

export default SetWorkloadPage;
