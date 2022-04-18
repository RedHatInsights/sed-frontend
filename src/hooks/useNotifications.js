import { useContext } from 'react';
import { NotificationContext } from '../contexts/NotificationProvider';

const useNotifications = () => {
  const { notifications, addNotification, removeNotification } = useContext(
    NotificationContext
  );

  const addSuccessNotification = (message, options) => {
    return addNotification('success', message, options);
  };

  const addErrorNotification = (message, options) => {
    return addNotification('danger', message, options);
  };

  const addInfoNotification = (message, options) => {
    return addNotification('info', message, options);
  };

  return {
    notifications,
    addSuccessNotification,
    addErrorNotification,
    addInfoNotification,
    removeNotification,
  };
};

export default useNotifications;
