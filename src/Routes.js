import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Route, Routes } from 'react-router-dom';
import { Bullseye, Spinner } from '@patternfly/react-core';
import pckg from '../package.json';
import ActivationKey from './Components/ActivationKey/ActivationKey';
const { routes: paths } = pckg;

const Dashboard = lazy(() =>
  import(/* webpackChunkName: "Dashboard" */ './Routes/Dashboard')
);

const ActivationKeys = lazy(() => import('./Components/ActivationKeys'));

const SuspenseWrapped = ({ children }) => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    {children}
  </Suspense>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path={paths.activationKey}
        element={
          <SuspenseWrapped>
            <ActivationKey />
          </SuspenseWrapped>
        }
      />
      <Route
        path={paths.activationKeys}
        element={
          <SuspenseWrapped>
            <ActivationKeys />
          </SuspenseWrapped>
        }
      />
      <Route
        path={paths.connector}
        element={
          <SuspenseWrapped>
            <Dashboard />
          </SuspenseWrapped>
        }
      />
    </Routes>
  );
};

SuspenseWrapped.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppRoutes;
