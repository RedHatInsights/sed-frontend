const SECTION = 'settings';
const APP_ID = 'connector';
const FRONTEND_PORT = 8002;
const routes = {};

routes[`beta/${SECTION}/${APP_ID}`] = {
  host: `https://localhost:${FRONTEND_PORT}`,
};
routes[`/${SECTION}/${APP_ID}`] = {
  host: `https://localhost:${FRONTEND_PORT}`,
};
routes[`/beta/apps/${APP_ID}`] = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/apps/${APP_ID}`] = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/beta/config`] = { host: `http://localhost:8889` };
module.exports = { routes };
