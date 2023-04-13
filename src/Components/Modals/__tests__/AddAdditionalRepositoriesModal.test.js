import React from 'react';
import { Provider } from 'react-redux';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddAdditionalRepositoriesModal from '../AddAdditionalRepositoriesModal';
const queryClient = new QueryClient();
const registry = init();

describe('Add Additional Repositories Modal', () => {
  it('renders correctly', () => {
    const props = {
      handleModalToggle: jest.fn(),
      isOpen: true,
      repositories: [],
    };
    render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <AddAdditionalRepositoriesModal {...props} />
        </QueryClientProvider>
      </Provider>
    );
    expect(screen.getByText('Add repositories')).toBeInTheDocument();
    expect(screen.getByText('Add repositories')).toBeInTheDocument();
  });
});
