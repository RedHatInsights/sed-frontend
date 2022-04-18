import React, { useState } from 'react';
import { AlertActionLink } from '@patternfly/react-core';
import { v4 as uuid } from 'uuid';
import PropTypes from 'prop-types';

const NotificationContext = React.createContext({
  notifications: [],
  addNotification: () => null,
  removeNotification: () => null,
});

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const buildNotificationProps = (variant, message, options) => {
    const notificationKey = uuid();
    const notificationProps = {
      variant: variant,
      message: message,
      key: notificationKey,
      timeout: options?.hasTimeout ?? true,
    };

    if (options && options.alertLinkText && options.alertLinkHref) {
      const linkAttributes = options.alertLinkIsDownload
        ? { download: '' }
        : {};
      const alertLink = (
        <>
          <AlertActionLink>
            <a href={options.alertLinkHref} {...linkAttributes}>
              {options.alertLinkText}
            </a>
          </AlertActionLink>
        </>
      );
      notificationProps.actionLinks = alertLink;
    }

    if (options && options.alertLinkIsDownload && options.alertLinkHref) {
      notificationProps.downloadHref = options.alertLinkHref;
    }

    return notificationProps;
  };

  const addNotification = (variant, message, options) => {
    const newNotificationProps = buildNotificationProps(
      variant,
      message,
      options
    );

    let newNotifications = [...notifications, { ...newNotificationProps }];

    if (options && options.keyOfAlertToReplace) {
      newNotifications = newNotifications.filter(
        (notification) => notification.key !== options.keyOfAlertToReplace
      );
    }

    setNotifications(newNotifications);
    return newNotificationProps.key;
  };

  const removeNotification = (key) => {
    setNotifications(
      notifications.filter((notification) => notification.key !== key)
    );
  };

  const contextValue = {
    notifications,
    addNotification: (variant, message, options) => {
      return addNotification(variant, message, options);
    },
    removeNotification: (key) => removeNotification(key),
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node,
};

export { NotificationContext, NotificationProvider as default };
