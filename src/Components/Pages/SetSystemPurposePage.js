import React from 'react';
import {
  Title,
  Text,
  TextVariants,
  FormGroup,
  FormSelectOption,
  FormSelect,
  Form,
} from '@patternfly/react-core';
import PropTypes from 'prop-types';
import Loading from '../LoadingState/Loading';

const SetSystemPurposePage = ({
  role,
  setRole,
  sla,
  setSla,
  usage,
  setUsage,
  data,
  isLoading,
  isError,
}) => {
  const Options = ({ options }) => (
    <>
      {options.map((option) => (
        <FormSelectOption key={option} value={option} label={option} />
      ))}
    </>
  );
  Options.propTypes = {
    options: PropTypes.array.isRequired,
  };
  const Placeholder = () => (
    <FormSelectOption label="Not defined" isPlaceholder />
  );
  return isLoading ? (
    <Loading />
  ) : (
    !isError && (
      <>
        <Title headingLevel="h2" className="pf-v5-u-mb-sm">
          Select system purpose
        </Title>
        <Text component={TextVariants.p} className="pf-v5-u-mb-xl">
          System purpose values are used by the subscriptions service to help
          filter and identify hosts. Setting values for these attributes is an
          optional step, but doing so ensures that subscriptions reporting
          accurately reflects the system. Only those values available to your
          account are shown.
        </Text>
        <Form>
          <FormGroup
            label="Role"
            className="pf-v5-u-mb-sm"
            fieldId="activation-key-role"
          >
            <FormSelect
              onChange={(_event, value) => setRole(value)}
              value={role}
              id="activation-key-role"
            >
              <Options options={data.roles} />
              <Placeholder />
            </FormSelect>
          </FormGroup>
          <FormGroup
            label="Service level agreement (SLA)"
            className="pf-v5-u-mb-sm"
            fieldId="activation-key-sla"
          >
            <FormSelect
              onChange={(_event, value) => setSla(value)}
              value={sla}
              id="activation-key-sla"
            >
              <Options options={data.serviceLevel} />
              <Placeholder />
            </FormSelect>
          </FormGroup>
          <FormGroup
            label="Usage"
            className="pf-v5-u-mb-sm"
            fieldId="activation-key-usage"
          >
            <FormSelect
              onChange={(_event, value) => setUsage(value)}
              value={usage}
              id="activation-key-usage"
            >
              <Options options={data.usage} />
              <Placeholder />
            </FormSelect>
          </FormGroup>
        </Form>
      </>
    )
  );
};

SetSystemPurposePage.propTypes = {
  role: PropTypes.string.isRequired,
  setRole: PropTypes.func.isRequired,
  sla: PropTypes.string.isRequired,
  setSla: PropTypes.func.isRequired,
  usage: PropTypes.string.isRequired,
  setUsage: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.oneOfType([PropTypes.bool, () => null]),
};

export default SetSystemPurposePage;
