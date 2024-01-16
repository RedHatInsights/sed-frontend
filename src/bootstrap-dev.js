import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AppEntry from './AppEntry';
import logger from 'redux-logger';

const container = document.getElementById('root');
const root = createRoot(container);

// after - not sure if this is correct
function AppEntryWithCallbackAfterRender() {
  useEffect(() => {
    root.setAttribute('data-ouia-safe', true);
  });

  return <AppEntry logger={logger} />;
}

root.render(<AppEntryWithCallbackAfterRender />);

// ANOTHER OPTION -> TODO: need to check if the render function returns root
// root.render(<AppEntry logger={logger} />).setAttribute('data-ouia-safe', true);

// before
// ReactDOM.render(<AppEntry logger={logger} />, root, () =>
//   root.setAttribute('data-ouia-safe', true)
// );
