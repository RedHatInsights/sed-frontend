import React from 'react';
import AppRoutes from './Routes';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import NotificationProvider from './contexts/NotificationProvider';
import Notifications from './Components/Notifications';

const App = () => {
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
