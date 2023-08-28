import React, { useEffect, useContext } from 'react';
import AppRoutes from './Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { RegistryContext } from './store';
import NotificationProvider from './contexts/NotificationProvider';
import Notifications from './Components/Notifications';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 10 * 1000,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const App = () => {
  const { getRegistry } = useContext(RegistryContext);
  useEffect(() => {
    getRegistry().register({ notifications: notificationsReducer });
  }, [getRegistry]);

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationsPortal />
      <NotificationProvider>
        <Notifications />
        <AppRoutes />
      </NotificationProvider>
    </QueryClientProvider>
  );
};
export default App;
