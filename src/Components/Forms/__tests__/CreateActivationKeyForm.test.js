import React from 'react';
import CreateActivationKeyForm from '../CreateActivationKeyForm';
import useSystemPuproseAttributes from '../../../hooks/useSystemPuproseAttributes';
import { Provider } from 'react-redux';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fireEvent, render } from '@testing-library/react';

const queryClient = new QueryClient();

const handleModalToggle = jest.fn();
const submitForm = jest.fn();

const CreateActivationKeyFormProps = {
  handleModalToggle,
  submitForm: submitForm,
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

  it('validates name field', () => {
    const props = { ...CreateActivationKeyFormProps };
    const { container } = render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <CreateActivationKeyForm {...props} />
        </QueryClientProvider>
      </Provider>
    );
    const nameInput = container.querySelector('#activation-key-name');
    fireEvent.change(nameInput, { target: { value: '!123' } });
    expect(nameInput.getAttribute('aria-invalid')).toBe('true');
    fireEvent.change(nameInput, { target: { value: 'abc-123' } });
    expect(nameInput.getAttribute('aria-invalid')).toBe('false');
  });

  it('calls submitForm if form is valid', () => {
    const props = { ...CreateActivationKeyFormProps };

    const { container } = render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <CreateActivationKeyForm {...props} />
        </QueryClientProvider>
      </Provider>
    );
    const form = container.querySelector('#create-activation-key-form');
    const nameInput = container.querySelector('#activation-key-name');
    fireEvent.change(nameInput, { target: { value: 'abc-123' } });
    fireEvent.submit(form);
    expect(submitForm).toHaveBeenCalled();
  });

  it('calls submitForm if form is valid', () => {
    const props = { ...CreateActivationKeyFormProps };

    const { container } = render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <CreateActivationKeyForm {...props} />
        </QueryClientProvider>
      </Provider>
    );
    const form = container.querySelector('#create-activation-key-form');
    const nameInput = container.querySelector('#activation-key-name');
    fireEvent.change(nameInput, { target: { value: 'abc-123' } });
    fireEvent.submit(form);
    expect(submitForm).toHaveBeenCalled();
  });

  it('closes the create activation key modal on success', async () => {
    const props = { ...CreateActivationKeyFormProps, isSuccess: true };

    render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <CreateActivationKeyForm {...props} />
        </QueryClientProvider>
      </Provider>
    );

    expect(handleModalToggle).toHaveBeenCalledTimes(1);
  });
});
