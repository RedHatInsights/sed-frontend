import React from 'react';
import PropTypes from 'prop-types';
import { useConfigApi } from '../../api';
import { Button, Modal, Text, TextContent } from '@patternfly/react-core';
import { pluralize, downloadFile } from '../../utils/helpers';

const ConfirmChangesModal = ({
  isOpen = false,
  handleCancel,
  handleConfirm,
  systemsCount,
  data,
}) => {
  const configApi = useConfigApi();

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
          Your changes applies to{' '}
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
          (async () => {
            const playbook = await configApi.getPlaybookPreview({
              compliance: data.compliance,
              insights: data.insights,
              remediations: data.remediations,
            });
            downloadFile(playbook);
          })();
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
  data: PropTypes.shape({
    compliance: PropTypes.bool,
    remediations: PropTypes.bool,
    insights: PropTypes.bool,
  }),
};

export default ConfirmChangesModal;
