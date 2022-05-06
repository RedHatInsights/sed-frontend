import React from 'react';
import { Provider } from 'react-redux';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
import DeleteActivationKeyConfirmationModal from '../DeleteActivationKeyConfirmationModal';
import '@testing-library/jest-dom';
const queryClient = new QueryClient();
const registry = init();

describe('Delete Activation Key Confirmation Modal', () => {
  const activationKeyName = 'Test Modal';
  it('renders correctly', () => {
    const props = {
      handleModalToggle: jest.fn(),
      isOpen: true,
      name: activationKeyName,
    };
    render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <DeleteActivationKeyConfirmationModal {...props} />
        </QueryClientProvider>
      </Provider>
    );
    expect(screen.getByText(activationKeyName)).toBeInTheDocument();
    expect(screen.getByText('Delete Activtivation Key?')).toBeInTheDocument();
  });
});
