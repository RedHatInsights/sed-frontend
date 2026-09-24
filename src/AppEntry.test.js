import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import fetchMock from 'jest-fetch-mock';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import AppEntry from './AppEntry';

jest.mock('@redhat-cloud-services/frontend-components/useChrome', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('@unleash/proxy-client-react', () => ({
  useFlag: () => false,
  useFlagsStatus: () => ({ flagsReady: true }),
}));

jest.mock(
  '@redhat-cloud-services/frontend-components-utilities/interceptors',
  () => ({
    useAxiosWithPlatformInterceptors: () => require('axios'),
  })
);

describe('RHC decommission page', () => {
  const axiosMock = new MockAdapter(axios);
  let chrome;
  let xhrOpen;

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    fetchMock.resetMocks();
    fetchMock.mockResponse(JSON.stringify({}));
    axiosMock.onAny().reply(200, {});
    xhrOpen = jest.spyOn(XMLHttpRequest.prototype, 'open');
    chrome = {
      updateDocumentTitle: jest.fn(),
      appAction: jest.fn(),
    };
    useChrome.mockReturnValue(chrome);
    global.insights = { chrome };
  });

  afterEach(() => {
    axiosMock.reset();
    xhrOpen.mockRestore();
    delete global.insights;
  });

  afterAll(() => {
    axiosMock.restore();
    fetchMock.disableMocks();
  });

  it('renders and opens help without API calls', async () => {
    render(
      <MemoryRouter initialEntries={['/insights/connector']}>
        <AppEntry />
      </MemoryRouter>
    );

    expect(
      await screen.findByLabelText('Settings table', {}, { timeout: 5000 })
    ).toBeInTheDocument();
    expect(
      screen.getByText('RHC Manager is being decommissioned')
    ).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.queryByRole('switch')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Confirm change' })
    ).not.toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByRole('button'));
    });
    expect(
      await screen.findByText('Register with an activation key')
    ).toBeInTheDocument();

    expect(Object.values(axiosMock.history).flat()).toEqual([]);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(xhrOpen).not.toHaveBeenCalled();
    expect(chrome.appAction).toHaveBeenCalledWith('cloud-connector-dashboard');
    expect(chrome.updateDocumentTitle).toHaveBeenCalledWith(
      'Remote Host Configuration - System Configuration | RHEL',
      true
    );
  });
});
