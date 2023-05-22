import { Modal, ModalVariant } from '@patternfly/react-core';
import React from 'react';
import { EditReleaseVersionForm } from '../Forms/EditReleaseVersionForm';
import Loading from '../LoadingState/Loading';

const description =
  'A release version enables you to configure your system to use a specific minor release of Red Hat Enterprise Linux. Setting a release version is useful if you are using an extended release of software, such as Extended Update Support. Most users will not set a release version.';

export const EditReleaseVersionModal = ({
  isOpen,
  onClose,
  releaseVersions,
  areReleaseVersionsLoading,
  activationKey,
}) => {
  const body = areReleaseVersionsLoading ? (
    <Loading />
  ) : (
    <EditReleaseVersionForm
      releaseVersions={releaseVersions}
      activationKey={activationKey}
      onClose={onClose}
    ></EditReleaseVersionForm>
  );

  return (
    <Modal
      variant={ModalVariant.small}
      title="Edit release version"
      description={description}
      isOpen={isOpen}
      onClose={onClose}
    >
      {body}
    </Modal>
  );
};
