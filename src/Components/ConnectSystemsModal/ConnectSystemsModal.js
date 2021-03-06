import React from 'react';
import { Modal, ModalVariant, Text, TextContent } from '@patternfly/react-core';
import { useHistory } from 'react-router-dom';

import './ConnectSystemsModal.scss';

import pckg from '../../../package.json';
import { RegisterWithActivationKey, RegisterWithUserName } from '../FormGroups';
const { routes: paths } = pckg;

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
          <RegisterWithActivationKey />
          <RegisterWithUserName />
        </div>
      </TextContent>
    </Modal>
  );
};

export default ConnectSystemsModal;
