import React from 'react';
import CreateActivationKeyForm from '../CreateActivationKeyForm';
import useSystemPuproseAttributes from '../../../hooks/useSystemPuproseAttributes';
import { Provider } from 'react-redux';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render } from '@testing-library/react';

const queryClient = new QueryClient();

const handleModalToggle = jest.fn();

const CreateActivationKeyFormProps = {
  handleModalToggle,
  submitForm: () => null,
  isSuccess: null,
  isError: null,
};

const registry = init();
const props = { ...CreateActivationKeyFormProps };

jest.mock('../../../hooks/useSystemPuproseAttributes');
describe('Create Activation Key Form', () => {
  beforeEach(() => {
    useSystemPuproseAttributes.mockReturnValue({
      isLoading: false,
      error: false,
      data: {
        roles: ['role'],
        serviceLevel: ['serviceLevel'],
        usage: ['usage'],
      },
    });
  });

  it('renders correctly when data is loaded', () => {
    const { container } = render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <CreateActivationKeyForm {...props} />
        </QueryClientProvider>
      </Provider>
    );
    expect(container).toMatchSnapshot();
  });
});
