import React, { useEffect, useContext } from 'react';
import AppRoutes from './Routes';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { RegistryContext } from './store';
import NotificationProvider from './contexts/NotificationProvider';
import Notifications from './Components/Notifications';

const App = () => {
  const { getRegistry } = useContext(RegistryContext);
  useEffect(() => {
    getRegistry().register({ notifications: notificationsReducer });
  }, [getRegistry]);

  return (
    <>
      <NotificationsPortal />
      <NotificationProvider>
        <Notifications />
        <AppRoutes />
      </NotificationProvider>
    </>
  );
};
export default App;
