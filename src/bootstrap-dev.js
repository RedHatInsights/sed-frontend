import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AppEntry from './AppEntry';
import logger from 'redux-logger';

const container = document.getElementById('root');
const root = createRoot(container);

function AppEntryWithCallbackAfterRender() {
  useEffect(() => {
    root.setAttribute('data-ouia-safe', true);
  });

  return <AppEntry logger={logger} />;
}

root.render(<AppEntryWithCallbackAfterRender />);
