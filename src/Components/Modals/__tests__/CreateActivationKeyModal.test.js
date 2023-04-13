import React from 'react';
import { Provider } from 'react-redux';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';
import CreateActivationKeyModal from '../CreateActivationKeyModal';
import useFeatureFlag from '../../../hooks/useFeatureFlag';

jest.mock('../../../hooks/useFeatureFlag');

const queryClient = new QueryClient();
const registry = init();

useFeatureFlag.mockReturnValue(true);

describe('Create Activation Key Modal', () => {
  it('renders correctly', () => {
    useFeatureFlag.mockReturnValueOnce(false);
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
  it('renders the wizard when feature flag is enabled', () => {
    const props = { handleModalToggle: jest.fn(), isOpen: true };
    render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <CreateActivationKeyModal {...props} />
        </QueryClientProvider>
      </Provider>
    );

    expect(document.body).toMatchSnapshot();
  });
});
