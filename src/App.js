import React, { useEffect, useContext, useMemo } from 'react';
import { Routes } from './Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { RegistryContext } from './store';
import { useHistory } from 'react-router-dom';
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
  const history = useHistory();
  useEffect(() => {
    getRegistry().register({ notifications: notificationsReducer });
  }, [getRegistry]);

  const appNavClick = useMemo(
    () => ({
      settings(redirect) {
        insights?.chrome?.appNavClick({ id: 'settings', redirect });
      },
      activationKeys(redirect) {
        insights?.chrome?.appNavClick({ id: 'activationKeys', redirect });
      },
    }),
    []
  );

  useEffect(() => {
    insights.chrome.init();
    insights.chrome.identifyApp('connector');
    const unregister = insights.chrome.on('APP_NAVIGATION', (event) => {
      if (event.domEvent) {
        history.push(`/${event.navId}`);
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
        <Routes />
      </NotificationProvider>
    </QueryClientProvider>
  );
};
export default App;
