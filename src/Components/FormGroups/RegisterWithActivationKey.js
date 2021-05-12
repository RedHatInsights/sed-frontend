import { ClipboardCopy, FormGroup, Tooltip } from '@patternfly/react-core';
import React from 'react';
import CopyHelperText from './CopyHelperText';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import { Stack, StackItem } from '@patternfly/react-core';

const RegisterWithActivationKey = () => {
  return (
    <FormGroup
      label={
        <span>
          Register with an activation key&nbsp;
          <Tooltip
            position="right"
            content={
              <Stack hasGutter>
                <StackItem>
                  Recommended for accounts without Simple Content Access enable
                </StackItem>
                <StackItem>
                  Systems can be registered using an actication key &amp; the
                  organiztaion ID. Using activation keys allows systems to be
                  associated to specific subscriptions. Activation keys can be
                  viewed on the &quot;Activation keys&quot; tab of the Red Hat
                  connector UI or on the customer portal.
                </StackItem>
              </Stack>
            }
          >
            <OutlinedQuestionCircleIcon />
          </Tooltip>
        </span>
      }
      helperText={<CopyHelperText />}
    >
      <ClipboardCopy>
        rhc connect -a &#60;activation-key&#62; -o&nbsp;
        &#60;organization-id&#62;
      </ClipboardCopy>
    </FormGroup>
  );
};

export default RegisterWithActivationKey;
