import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { init } from '../../../store';
import { EditReleaseVersionForm } from '../EditReleaseVersionForm';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const registry = init();
const queryClient = new QueryClient();

const props = {
  onClose: jest.fn(),
  releaseVersions: ['1.1', '1.2'],
  activationKey: {
    name: '',
    releaseVersion: '',
    usage: '',
    serviceLevel: '',
    role: '',
  },
};

describe('Edit release version form', () => {
  it('renders correctly', () => {
    render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <EditReleaseVersionForm {...props} />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText('Not defined')).toBeInTheDocument();
  });

  it('shows the dropdown', () => {
    render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <EditReleaseVersionForm {...props} />
        </QueryClientProvider>
      </Provider>
    );

    screen.getByText('Not defined').click();
    expect(screen.getByText('1.1')).toBeInTheDocument();
  });
});
