import {
  ClipboardCopy,
  FormGroup,
  Stack,
  StackItem,
  Tooltip,
} from '@patternfly/react-core';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';
import React from 'react';
import CopyHelperText from './CopyHelperText';

const RegisterWithUserName = () => {
  return (
    <FormGroup
      label={
        <span>
          Register with a username and password&nbsp;
          <Tooltip
            position="right"
            content={
              <Stack hasGutter>
                <StackItem>
                  Recommended for accounts with Simple Content Access enable
                </StackItem>
                <StackItem>
                  Systems can be registered using the username and password of a
                  user on an account with valid subscription. Systems will be
                  registered trough Simple Content Access (SCA) or if SCA is not
                  enabled, subscriptions will be auto-attached.
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
        rhc connect -u &#60;username&#62; -p &#60;password&#62;
      </ClipboardCopy>
    </FormGroup>
  );
};

export default RegisterWithUserName;
