import { ClipboardCopy, FormGroup, Tooltip } from '@patternfly/react-core';
import React from 'react';
import CopyHelperText from './CopyHelperText';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';

const RegisterWithActivationKey = () => (
  <FormGroup
    label={
      <span>
        Register with an activation key&nbsp;
        <Tooltip
          content={
            <div>
              Organization administrators can view, create, and edit activation
              keys on the &quot;Activation keys&quot; section of
              console.redhat.com. The organization ID is a Candlepin-specific
              identifier, which can be accessed from the activation keys page.
            </div>
          }
        >
          <OutlinedQuestionCircleIcon />
        </Tooltip>
      </span>
    }
  >
    <ClipboardCopy>
      rhc connect -a &#60;activation-key&#62; -o&nbsp; &#60;organization-id&#62;
    </ClipboardCopy>
    <CopyHelperText />
  </FormGroup>
);

export default RegisterWithActivationKey;
