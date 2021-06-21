import React, { Fragment, useEffect, useContext } from 'react';
import { Routes } from './Routes';

import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { RegistryContext } from './store';
import { useHistory } from 'react-router-dom';

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
    <Fragment>
      <NotificationsPortal />
      <Routes />
    </Fragment>
  );
};
export default App;
