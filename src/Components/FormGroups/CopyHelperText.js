import { FormHelperText } from '@patternfly/react-core';
import { CopyIcon } from '@patternfly/react-icons';
import React from 'react';

const CopyHelperText = () => (
  <FormHelperText isHidden={false} className="pf-u-mt-sm">
    Click the <CopyIcon /> icon on a row to copy the command with your values
  </FormHelperText>
);

export default CopyHelperText;
