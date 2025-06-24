import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Text, TextContent } from '@patternfly/react-core';
import { pluralize } from '../../utils/helpers';
import InsightsLink from '@redhat-cloud-services/frontend-components/InsightsLink';

const ConfirmChangesModal = ({
  remediation,
  isOpen = false,
  handleCancel,
  handleConfirm,
  systemsCount,
}) => {
  return (
    <Modal
      variant="small"
      title="Confirm change"
      isOpen={isOpen}
      onClose={handleCancel}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          type="button"
          onClick={handleConfirm}
        >
          Confirm change
        </Button>,
        <Button
          key="cancel"
          variant="link"
          type="button"
          onClick={handleCancel}
        >
          Cancel
        </Button>,
      ]}
    >
      <TextContent>
        <Text component="p">
          Do you wish to {remediation ? 'enable' : 'disable'} the execution of
          Remediation playbooks for systems connecting with the RHC client?
        </Text>
        <Text component="p">
          Your change will be applied to{' '}
          <b>
            {systemsCount} connected {pluralize(systemsCount, 'system')}
          </b>{' '}
          and <b>all future systems</b> connected via remote host configuration
          (rhc). Altering this setting may affect{' '}
          <InsightsLink app="remediations" to="/">
            Remediation Plan
          </InsightsLink>{' '}
          execution.
        </Text>
      </TextContent>
    </Modal>
  );
};

ConfirmChangesModal.propTypes = {
  remediation: PropTypes.bool,
  isOpen: PropTypes.bool,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  systemsCount: PropTypes.number.isRequired,
};

export default ConfirmChangesModal;
