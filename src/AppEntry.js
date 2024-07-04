import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { init, RegistryContext } from './store';
import App from './App';
import logger from 'redux-logger';
import Authentication from './Components/Authentication/Authentication';
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

const AppEntry = () => {
  const chrome = useChrome();

  const registry = chrome.isProd() ? init() : init(logger);

  return (
    <QueryClientProvider client={queryClient}>
      <RegistryContext.Provider
        value={{
          getRegistry: () => registry,
        }}
      >
        <Provider store={registry.getStore()}>
          <Authentication>
            <App />
          </Authentication>
        </Provider>
      </RegistryContext.Provider>
    </QueryClientProvider>
  );
};

export default AppEntry;
