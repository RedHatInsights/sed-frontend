import {
  ClipboardCopy,
  FormGroup,
  // Popover,
  // Text,
  // TextContent,
} from '@patternfly/react-core';
import React from 'react';
import CopyHelperText from './CopyHelperText';
// import {
//   OutlinedQuestionCircleIcon,
//   ExternalLinkAltIcon,
// } from '@patternfly/react-icons';

const RegisterWithActivationKey = () => {
  return (
    <FormGroup
      label={
        <span>
          Register with an activation key&nbsp;
          {/* <Popover
            position="right"
            bodyContent={
              <TextContent>
                <Text>
                  Recommended for most users, and accounts who do not have
                  Simple Content Access (SCA) enabled. Activation keys allow
                  systems to be associated with specific subscriptions and
                  service levels.
                </Text>
                <Text className="pf-u-mb-0">
                  Activation key: Organization administrators can view, create,
                  and edit activation keys through&nbsp;
                  <Text
                    href="https://access.redhat.com/management/activation_keys"
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Red Hat Subscription Management&nbsp;
                    <ExternalLinkAltIcon />
                  </Text>
                  on the Customer Portal.
                </Text>
                <Text>
                  Organization ID: The organization ID is a Candlepin-specific
                  identifier, and can be accessed through the Customer Portal on
                  the&nbsp;
                  <Text
                    href="https://access.redhat.com/management/activation_keys"
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    activation keys&nbsp;
                    <ExternalLinkAltIcon />
                  </Text>
                  &nbsp;page.
                </Text>
              </TextContent>
            }
          >
            <OutlinedQuestionCircleIcon />
          </Popover> */}
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
