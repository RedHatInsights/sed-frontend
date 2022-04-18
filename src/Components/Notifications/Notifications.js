import React from 'react';
import {
  Alert,
  AlertActionCloseButton,
  AlertGroup,
} from '@patternfly/react-core';
import useNotifications from '../../hooks/useNotifications';

const Notifications = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <AlertGroup isToast>
      {notifications.map((notification, i) => (
        <Alert
          isLiveRegion
          timeout={notification.timeout}
          title={notification.message}
          variant={notification.variant}
          key={notification.key}
          actionClose={
            <AlertActionCloseButton
              data-testid={`notification-close-btn-${i}`}
              title={notification.message}
              variantLabel={`${notification.variant} alert`}
              onClose={() => {
                removeNotification(notification.key);
                if (notification?.downloadHref) {
                  window.URL.revokeObjectURL(notification.downloadHref);
                }
              }}
            />
          }
        />
      ))}
    </AlertGroup>
  );
};

export default Notifications;
