import React from 'react';
import AppRoutes from './Routes';
import NotificationsProvider from '@redhat-cloud-services/frontend-components-notifications/NotificationsProvider';

const App = () => {
  return (
    <>
      <NotificationsProvider>
        <AppRoutes />
      </NotificationsProvider>
    </>
  );
};
export default App;
