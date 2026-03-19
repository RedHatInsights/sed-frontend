import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AccessCheck } from '@project-kessel/react-kessel-access-check';
import { useFlag, useFlagsStatus } from '@unleash/proxy-client-react';
import { init, RegistryContext } from './store';
import App from './App';
import logger from 'redux-logger';
import Authentication from './Components/Authentication/Authentication';
import Loading from './Components/LoadingState/Loading';
import PermissionsProvider from './PermissionsProvider';
import PermissionsProviderKessel from './PermissionsProviderKessel';
import { KESSEL_API_BASE_URL } from './constants';

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

const AuthenticatedApp = () => {
  const { flagsReady } = useFlagsStatus();
  const isKesselEnabled = useFlag('rhc_manager.kessel_enabled');

  if (!flagsReady) {
    return <Loading />;
  }

  const content = (
    <Authentication>
      <App />
    </Authentication>
  );

  return isKesselEnabled ? (
    <AccessCheck.Provider
      baseUrl={window.location.origin}
      apiPath={KESSEL_API_BASE_URL}
    >
      <PermissionsProviderKessel>{content}</PermissionsProviderKessel>
    </AccessCheck.Provider>
  ) : (
    <PermissionsProvider>{content}</PermissionsProvider>
  );
};

const AppEntry = () => {
  const registry = IS_DEV ? init(logger) : init();
  return (
    <QueryClientProvider client={queryClient}>
      <RegistryContext.Provider
        value={{
          getRegistry: () => registry,
        }}
      >
        <Provider store={registry.getStore()}>
          <AuthenticatedApp />
        </Provider>
      </RegistryContext.Provider>
    </QueryClientProvider>
  );
};

export default AppEntry;
