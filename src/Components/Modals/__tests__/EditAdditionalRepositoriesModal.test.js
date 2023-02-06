import React from 'react';
import { Provider } from 'react-redux';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EditAdditionalRepositoriesModal from '../EditAdditionalRepositoriesModal';
const queryClient = new QueryClient();
const registry = init();

describe('Edit Additional Repositories Modal', () => {
  it('renders correctly', () => {
    const props = {
      handleModalToggle: jest.fn(),
      isOpen: true,
    };
    render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <EditAdditionalRepositoriesModal {...props} />
        </QueryClientProvider>
      </Provider>
    );
    expect(screen.getByText('Add repositories')).toBeInTheDocument();
    expect(screen.getByText('Add repositories')).toBeInTheDocument();
  });
});
