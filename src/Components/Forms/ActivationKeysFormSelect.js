import React, { useState } from 'react';
import {
  FormGroup,
  Select,
  SelectVariant,
  SelectOption,
} from '@patternfly/react-core';

import PropTypes from 'prop-types';

const ActivationKeysFormSelect = (props) => {
  const { label, popover, data, onSelect, helperText } = props;
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const handleToggle = () => {
    setOpen(!isOpen);
  };
  const options = data.map((role) => {
    return <SelectOption key={role} value={role} label={role} />;
  });
  const valueChange = (_, selection) => {
    setSelected(selection);
    setOpen(!isOpen);
    onSelect(selection);
  };

  return (
    <FormGroup label={label} labelIcon={popover} helperText={helperText}>
      <Select
        variant={SelectVariant.single}
        placeholderText="Select an option"
        isOpen={isOpen}
        onSelect={valueChange}
        onToggle={handleToggle}
        selections={selected}
      >
        {options}
      </Select>
    </FormGroup>
  );
};

ActivationKeysFormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  popover: PropTypes.element.isRequired,
  helperText: PropTypes.string,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ActivationKeysFormSelect;
