import React from 'react';
import { Provider } from 'react-redux';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import CreateActivationKeyModal from '../CreateActivationKeyModal';

const queryClient = new QueryClient();
const registry = init();

describe('Create Activation Key Modal', () => {
  it('renders correctly', () => {
    const props = { handleModalToggle: jest.fn(), isOpen: true };
    render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <CreateActivationKeyModal {...props} />
        </QueryClientProvider>
      </Provider>
    );
    /**
     * document.body needed because the modal
     * does not render within the container
     *
     */
    expect(document.body).toMatchSnapshot();
  });
});
