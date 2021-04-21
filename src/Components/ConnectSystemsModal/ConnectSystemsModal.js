import React from 'react';
import {
  ClipboardCopy,
  FormGroup,
  FormHelperText,
  Modal,
  ModalVariant,
  Text,
  TextContent,
} from '@patternfly/react-core';
import { CopyIcon } from '@patternfly/react-icons';
import { useHistory } from 'react-router-dom';

import './ConnectSystemsModal.scss';

import pckg from '../../../package.json';
const { routes: paths } = pckg;

const CopyHelperText = () => (
  <FormHelperText isHidden={false} className="pf-u-mt-sm">
    Click the <CopyIcon /> icon on a row to copy the command with your values
  </FormHelperText>
);

const ConnectSystemsModal = () => {
  const { push } = useHistory();

  return (
    <Modal
      variant={ModalVariant.medium}
      title="Connect systems with Red Hat connector"
      isOpen={true}
      onClose={() => push(paths.connector)}
      className="connector"
    >
      <TextContent>
        <Text className="pf-u-mb-0">
          Red Hat connector allows you to connect your systems to Red Hat with
          one command.
        </Text>
        <Text>Connect, register and manage.</Text>
        <Text className="pf-u-mb-sm">
          Red Hat connector is for RHEL 8.4 systems and newer.
        </Text>
        <Text>
          To register other RHEL systems, check out the{' '}
          <Text
            href="./insights/registration"
            component="a"
            target="_blank"
            rel="noopener noreferrer"
          >
            Registration Assistant
          </Text>
          .
        </Text>
        <div className="pf-c-form inc-c-connector__connect-systems-modal-form">
          <FormGroup
            label="Register with an activation key"
            helperText={<CopyHelperText />}
          >
            <ClipboardCopy>
              rhc connect -u &#60;username&#62; -p &#60;password&#62;
            </ClipboardCopy>
          </FormGroup>
          <FormGroup
            label="Register with a username and password"
            helperText={<CopyHelperText />}
          >
            <ClipboardCopy>
              rhc connect -a &#60;activation-key&#62; -o&nbsp;
              &#60;organization-id&#62;
            </ClipboardCopy>
          </FormGroup>
        </div>
      </TextContent>
    </Modal>
  );
};

export default ConnectSystemsModal;
