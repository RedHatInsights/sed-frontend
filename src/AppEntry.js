import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { init, RegistryContext } from './store';
import App from './App';
import logger from 'redux-logger';
import Authentication from './Components/Authentication/Authentication';

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
  const registry = IS_DEV ? init(logger) : init();
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
