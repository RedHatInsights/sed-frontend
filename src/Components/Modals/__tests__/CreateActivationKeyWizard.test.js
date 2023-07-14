import React from 'react';
import CreateActivationKeyWizard from '../CreateActivationKeyWizard';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import useCreateActivationKey from '../../../hooks/useCreateActivationKey';

jest.mock('../../../hooks/useCreateActivationKey');

const queryClient = new QueryClient();

const mutate = jest.fn();
useCreateActivationKey.mockReturnValue({
  mutate,
  error: false,
});

describe('Create Activation Key Wizard', () => {
  const pages = [1, 2, 3, 4, 5];
  pages.forEach((page) => {
    it(`renders page ${page} correctly`, () => {
      const { container } = render(
        <QueryClientProvider client={queryClient}>
          <CreateActivationKeyWizard onClose={() => {}} isOpen={true} />
        </QueryClientProvider>
      );
      for (let i = 1; i < page; i++) {
        fireEvent.click(container.nextSibling.querySelector('.pf-m-primary'));
      }
      expect(document.body).toMatchSnapshot();
    });
  });

  it("Doesn't confirm on close when nothing has been done", () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <CreateActivationKeyWizard onClose={() => {}} isOpen={true} />
      </QueryClientProvider>
    );
    fireEvent.click(container.nextSibling.querySelector('.pf-c-wizard__close'));
    expect(document.body).toMatchSnapshot();
  });

  it('Confirms on close one next has been clicked', () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <CreateActivationKeyWizard onClose={() => {}} isOpen={true} />
      </QueryClientProvider>
    );
    fireEvent.click(container.nextSibling.querySelector('.pf-m-primary'));
    fireEvent.click(container.nextSibling.querySelector('.pf-c-wizard__close'));
    expect(document.body).toMatchSnapshot();
  });

  it('Saves data', async () => {
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <CreateActivationKeyWizard onClose={() => {}} isOpen={true} />
      </QueryClientProvider>
    );
    for (let i = 0; i < 4; i++) {
      fireEvent.click(container.nextSibling.querySelector('.pf-m-primary'));
    }

    expect(document.body).toMatchSnapshot();
  });
});
