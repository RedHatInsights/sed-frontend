import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import AppEntry from './AppEntry';

const container = document.getElementById('root');
const root = createRoot(container);

// after - not sure if this is correct
function AppEntryWithCallbackAfterRender() {
  useEffect(() => {
    root.setAttribute('data-ouia-safe', true);
  });

  return <AppEntry />;
}

root.render(<AppEntryWithCallbackAfterRender />);

// ANOTHER OPTION -> TODO: need to check if the render function returns root
// root.render(<AppEntry />).setAttribute("data-ouia-safe", true);

// before
// ReactDOM.render(<AppEntry />, root, () =>
//   root.setAttribute('data-ouia-safe', true)
// );
