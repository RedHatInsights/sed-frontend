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
        <Text>
          Red Hat connector allows you to register with Red Hat Subscription
          Management (RHSM), connect to Red Hat Insights, and manage your
          Insights connections with one command.
        </Text>
        <Text>
          Red Hat connector connects RHEL 7.9+ and 8.4+ systems. To register
          other systems with RHSM or Insights, check out the{' '}
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
