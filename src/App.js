import React, { Fragment, useEffect, useContext } from 'react';
import { Routes } from './Routes';

import NotificationsPortal from '@redhat-cloud-services/frontend-components-notifications/NotificationPortal';
import { notificationsReducer } from '@redhat-cloud-services/frontend-components-notifications/redux';
import { RegistryContext } from './store';

const App = (props) => {
  const { getRegistry } = useContext(RegistryContext);
  useEffect(() => {
    getRegistry().register({ notifications: notificationsReducer });
  }, [getRegistry]);
  useEffect(() => {
    insights.chrome.init();

    insights.chrome.identifyApp('connector');
    return insights.chrome.on('APP_NAVIGATION', (event) =>
      this.props.history.push(`/${event.navId}`)
    );
  }, []);

  return (
    <Fragment>
      <NotificationsPortal />
      <Routes childProps={props} />
    </Fragment>
  );
};
export default App;
