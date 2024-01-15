import { FormHelperText } from '@patternfly/react-core';
import { CopyIcon } from '@patternfly/react-icons';
import React from 'react';

const CopyHelperText = () => (
  <FormHelperText className="pf-v5-u-mt-sm">
    Click the <CopyIcon /> icon on a row to copy the command
  </FormHelperText>
);

export default CopyHelperText;
