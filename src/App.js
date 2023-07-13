import React, { useEffect, useContext } from 'react';
import { Routes } from './Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { RegistryContext } from './store';
import { useHistory } from 'react-router-dom';
import NotificationProvider from './contexts/NotificationProvider';
import Notifications from './Components/Notifications';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';

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
  const chrome = useChrome();
  const { getRegistry } = useContext(RegistryContext);
  const history = useHistory();
  useEffect(() => {
    getRegistry().register({ notifications: notificationsReducer });
  }, [getRegistry]);

  useEffect(() => {
    chrome.identifyApp('connector');
    const unregister = chrome.on('APP_NAVIGATION', (event) => {
      if (event.domEvent) {
        history.push(`/${event.navId}`);
        chrome.appNavClick({ id: event.navId, redirect: true });
      }
    });
    return () => unregister();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationsPortal />
      <NotificationProvider>
        <Notifications />
        <Routes />
      </NotificationProvider>
    </QueryClientProvider>
  );
};
export default App;
