/*global module*/

const SECTION = 'settings';
const APP_ID = 'connector';
const FRONTEND_PORT = 8002;
const API_PORT = 8888;
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

routes[`/api/${APP_ID}`] = { host: `https://localhost:${API_PORT}` };

module.exports = { routes };
