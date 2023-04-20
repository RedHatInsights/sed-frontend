import React, { useEffect, useContext, useMemo } from 'react';
import AppRoutes from './Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { RegistryContext } from './store';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  useEffect(() => {
    getRegistry().register({ notifications: notificationsReducer });
  }, [getRegistry]);

  const appNavClick = useMemo(
    () => ({
      settings(redirect) {
        chrome.appNavClick({ id: 'settings', redirect });
      },
      activationKeys(redirect) {
        chrome.appNavClick({ id: 'activationKeys', redirect });
      },
    }),
    []
  );

  useEffect(() => {
    chrome.identifyApp('connector');
    const unregister = chrome.on('APP_NAVIGATION', (event) => {
      if (event.domEvent) {
        navigate(`/${event.navId}`);
        appNavClick[event.navId] !== undefined
          ? appNavClick[event.navId](true)
          : appNavClick.settings(true);
      }
    });
    return () => unregister();
  }, []);

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
