import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Text, TextContent } from '@patternfly/react-core';

const ConfirmChangesModal = ({
  isOpen = false,
  handleCancel,
  handleConfirm,
}) => {
  return (
    <Modal
      variant="small"
      title="Confirm changes"
      isOpen={isOpen}
      onClose={handleCancel}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          type="button"
          onClick={handleConfirm}
        >
          Confirm changes
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
          Your changes applies to <b>1032 connected systems</b>. Selected
          settings will also be applied to <b>all future systems</b> that are
          connect through Red Hat Connect (rhc).
        </Text>
        <Text component="p" className="pf-u-mb-sm">
          Upon confirmation, an Ansible Playbook will be pushed to 1032 systems
          to apply changes.
        </Text>
      </TextContent>
      <a href="#">View playbook</a>
    </Modal>
  );
};

ConfirmChangesModal.propTypes = {
  isOpen: PropTypes.bool,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default ConfirmChangesModal;
