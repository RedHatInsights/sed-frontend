import React from 'react';

global.React = React;

jest.mock('@redhat-cloud-services/frontend-components/useChrome', () => ({
  __esModule: true,
  default: () => ({
    hideGlobalFilter: jest.fn(),
    updateDocumentTitle: jest.fn(),
    auth: {
      getToken: () => Promise.resolve('TOKEN'),
      getUser: () =>
        Promise.resolve({
          identity: {
            account_number: '0',
            type: 'User',
            user: {
              is_org_admin: true,
            },
          },
          entitlements: {
            hybrid_cloud: { is_entitled: true },
            insights: { is_entitled: true },
            openshift: { is_entitled: true },
            smart_management: { is_entitled: false },
          },
        }),
    },
    appAction: jest.fn(),
    appObjectId: jest.fn(),
    on: jest.fn(),
    getUserPermissions: () => Promise.resolve(['inventory:*:*']),
  }),
}));
