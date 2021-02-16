import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Bullseye, Spinner } from '@patternfly/react-core';
import pckg from '../package.json';
const { routes: paths } = pckg;

const Dashboard = lazy(() =>
  import(/* webpackChunkName: "Dashboard" */ './Routes/Dashboard')
);

export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <Switch>
      <Route path={paths.sed} component={Dashboard} />
    </Switch>
  </Suspense>
);
