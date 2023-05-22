import React from 'react';
import { EditReleaseVersionModal } from '../EditReleaseVersionModal';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';
import { init } from '../../../store';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const queryClient = new QueryClient();
const registry = init();

const props = {
  isOpen: true,
  onClose: jest.fn(),
  releaseVersions: ['1.1', '1.2'],
  areReleaseVersionsLoading: false,
  activationKey: {
    name: '',
    releaseVersion: '',
    serviceLevel: '',
    usage: '',
    role: '',
  },
};

describe('Edit Release Version Modal', () => {
  it('renders correctly', () => {
    render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <EditReleaseVersionModal {...props} />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText('Edit release version')).toBeInTheDocument();
    expect(screen.getByText('Not defined')).toBeInTheDocument();
  });
});
