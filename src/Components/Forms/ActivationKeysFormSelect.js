import React, { useState } from 'react';
import {
  FormGroup,
  FormSelect,
  FormSelectOption,
} from '@patternfly/react-core';

import PropTypes from 'prop-types';

const ActivationKeysFormSelect = (props) => {
  const {
    label,
    popover,
    data,
    onSelect,
    helperText,
    name,
    value,
    placeholderValue,
    disableDefaultValues,
  } = props;
  const [selected, setSelected] = useState('');
  const options = data.map((role) => {
    return <FormSelectOption key={role} value={role} label={role} />;
  });
  const valueChange = (value) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <FormGroup label={label} labelIcon={popover} helperText={helperText}>
      <FormSelect
        onChange={valueChange}
        value={selected || value}
        name={name}
        aria-label={placeholderValue}
      >
        <FormSelectOption
          label={placeholderValue}
          isPlaceholder={true}
          isDisabled={disableDefaultValues}
        />
        {options}
      </FormSelect>
    </FormGroup>
  );
};

ActivationKeysFormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  popover: PropTypes.element,
  helperText: PropTypes.string,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  name: PropTypes.string,
  placeholderValue: PropTypes.string,
  value: PropTypes.string,
  disableDefaultValues: PropTypes.bool,
};

export default ActivationKeysFormSelect;
