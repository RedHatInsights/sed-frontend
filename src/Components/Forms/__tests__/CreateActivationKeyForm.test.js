import React from 'react';
import CreateActivationKeyForm from '../CreateActivationKeyForm';
import useSystemPurposeAttributes from '../../../hooks/useSystemPurposeAttributes';
import { Provider } from 'react-redux';
import { init } from '../../../store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

jest.mock('../../../hooks/useSystemPurposeAttributes');
describe('Create Activation Key Form', () => {
  beforeEach(() => {
    useSystemPurposeAttributes.mockReturnValue({
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
    fireEvent.change(nameInput, { target: { value: '123Abc#' } });
    expect(nameInput.getAttribute('aria-invalid')).toBe('true');
    fireEvent.change(nameInput, { target: { value: '-Abc_123' } });
    expect(nameInput.getAttribute('aria-invalid')).toBe('false');
  });

  it('validates name length', () => {
    const props = { ...CreateActivationKeyFormProps };
    const { container } = render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <CreateActivationKeyForm {...props} />
        </QueryClientProvider>
      </Provider>
    );
    const validLength = Array(256).join('a');
    const invalidLength = Array(257).join('b');
    const nameInput = container.querySelector('#activation-key-name');
    fireEvent.change(nameInput, { target: { value: invalidLength } });
    expect(nameInput.getAttribute('aria-invalid')).toBe('true');
    fireEvent.change(nameInput, { target: { value: validLength } });
    expect(nameInput.getAttribute('aria-invalid')).toBe('false');
    fireEvent.change(nameInput, { target: { value: '' } });
    expect(nameInput.getAttribute('aria-invalid')).toBe('true');
  });

  it('disables submit button when editing if no changes were made', () => {
    const activationKey = {
      name: 'test',
      usage: 'test',
      serviceLevel: 'test',
      role: 'test',
    };
    const props = {
      ...CreateActivationKeyFormProps,
      activationKey: activationKey,
    };
    render(
      <Provider store={registry.getStore()}>
        <QueryClientProvider client={queryClient}>
          <CreateActivationKeyForm {...props} />
        </QueryClientProvider>
      </Provider>
    );
    const submitButton = screen.getByTestId('activation-key-submit-button');
    expect(submitButton).toBeDisabled();
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
