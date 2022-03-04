import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Bullseye, Spinner } from '@patternfly/react-core';
import pckg from '../package.json';
import Authentication from './Components/Authentication/Authentication';
const { routes: paths } = pckg;

const Dashboard = lazy(() =>
  import(/* webpackChunkName: "Dashboard" */ './Routes/Dashboard')
);

const ActivationKeys = lazy(() => import('./Components/ActivationKeys'));

export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <Authentication>
      <Switch>
        <Route path={paths.activationKeys} component={ActivationKeys} />
        <Route path={paths.connector} component={Dashboard} />
      </Switch>
    </Authentication>
  </Suspense>
);
