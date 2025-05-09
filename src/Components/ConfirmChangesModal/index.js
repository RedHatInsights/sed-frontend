import React from 'react';
import PropTypes from 'prop-types';
import { useGetPlaybookPreview } from '../../api';
import { Button, Modal, Text, TextContent } from '@patternfly/react-core';
import { pluralize, downloadFile } from '../../utils/helpers';

const ConfirmChangesModal = ({
  isOpen = false,
  handleCancel,
  handleConfirm,
  systemsCount,
  profileId,
}) => {
  const playbook = useGetPlaybookPreview(profileId);

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
          Your change applies to{' '}
          <b>
            {systemsCount} connected {pluralize(systemsCount, 'system')}
          </b>
          . Selected settings will also be applied to <b>all future systems</b>{' '}
          that are connected through remote host configuration (rhc).
        </Text>
        <Text component="p" className="pf-v5-u-mb-sm">
          Upon confirmation, an Ansible Playbook will be pushed to{' '}
          {systemsCount} {pluralize(systemsCount, 'system')} to apply changes.
        </Text>
      </TextContent>
      <Button
        variant="link"
        onClick={() => {
          downloadFile(playbook);
        }}
        style={{ paddingLeft: 0 }}
      >
        View playbook
      </Button>
    </Modal>
  );
};

ConfirmChangesModal.propTypes = {
  isOpen: PropTypes.bool,
  handleConfirm: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  systemsCount: PropTypes.number.isRequired,
  profileId: PropTypes.string.isRequired,
};

export default ConfirmChangesModal;
