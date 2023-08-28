import React from 'react';
import { Provider } from 'react-redux';
import { init, RegistryContext } from './store';
import App from './App';
import logger from 'redux-logger';

const AppEntry = () => {
  const registry = IS_DEV ? init(logger) : init();
  return (
    <RegistryContext.Provider
      value={{
        getRegistry: () => registry,
      }}
    >
      <Provider store={registry.getStore()}>
        <App />
      </Provider>
    </RegistryContext.Provider>
  );
};

export default AppEntry;
