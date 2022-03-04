import React, { Fragment, useEffect, useContext } from 'react';
import { Routes } from './Routes';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { RegistryContext } from './store';
import { useHistory } from 'react-router-dom';

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
  useEffect(() => {
    insights.chrome.init();

    insights.chrome.identifyApp('connector');
    const unregister = insights.chrome.on('APP_NAVIGATION', (event) =>
      history.push(`/${event.navId}`)
    );
    return () => {
      unregister();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Fragment>
        <NotificationsPortal />
        <Routes />
      </Fragment>
    </QueryClientProvider>
  );
};
export default App;
