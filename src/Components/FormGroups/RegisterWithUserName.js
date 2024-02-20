import {
  ClipboardCopy,
  FormGroup,
  Text,
  TextContent,
  Popover,
} from '@patternfly/react-core';
import {
  OutlinedQuestionCircleIcon,
  ExternalLinkAltIcon,
} from '@patternfly/react-icons';
import React from 'react';
import CopyHelperText from './CopyHelperText';

const RegisterWithUserName = () => {
  return (
    <FormGroup
      label={
        <span>
          Register with a username and password&nbsp;
          <Popover
            position="right"
            bodyContent={
              <TextContent>
                <Text>
                  Recommended for users with accounts with Simple Content Access
                  (SCA) enabled. If SCA is not enabled for your account,
                  subscriptions will be auto-attached.&nbsp;
                  <Text
                    href="https://access.redhat.com/articles/simple-content-access"
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Learn about Simple Content Access&nbsp;
                    <ExternalLinkAltIcon />
                  </Text>
                </Text>
                <Text>
                  Any credentials of a user with a valid subscription can be
                  used.
                </Text>
              </TextContent>
            }
          >
            <OutlinedQuestionCircleIcon />
          </Popover>
        </span>
      }
    >
      <ClipboardCopy>
        rhc connect -u &#60;username&#62; -p &#60;password&#62;
      </ClipboardCopy>
      <CopyHelperText />
    </FormGroup>
  );
};

export default RegisterWithUserName;
