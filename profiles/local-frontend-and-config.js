const SECTION = 'insights';
const APP_ID = 'connector';
const FRONTEND_PORT = 8002;
const routes = {};

routes[`/preview/${SECTION}/${APP_ID}`] = {
  host: `https://localhost:${FRONTEND_PORT}`,
};
routes[`/${SECTION}/${APP_ID}`] = {
  host: `https://localhost:${FRONTEND_PORT}`,
};
routes[`/preview/apps/${APP_ID}`] = {
  host: `https://localhost:${FRONTEND_PORT}`,
};
routes[`/apps/${APP_ID}`] = { host: `https://localhost:${FRONTEND_PORT}` };
routes['/preview/config'] = { host: 'http://127.0.0.1:8889/' };
routes['/config'] = { host: 'http://127.0.0.1:8889/' };

module.exports = { routes };
