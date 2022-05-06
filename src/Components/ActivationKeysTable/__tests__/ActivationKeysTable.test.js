import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
import ActivationKeysTable from '../ActivationKeysTable';
import useActivationKeys from '../../../hooks/useActivationKeys';
import { get, def } from 'bdd-lazy-var';
import '@testing-library/jest-dom';
jest.mock('../../../hooks/useActivationKeys');
jest.mock('uuid', () => {
  return { v4: jest.fn(() => '00000000-0000-0000-0000-000000000000') };
});

const queryClient = new QueryClient();

const actions = () => {
  return [
    {
      title: 'Delete',
      onClick: () => null,
    },
  ];
};
const Table = () => (
  <QueryClientProvider client={queryClient}>
    <ActivationKeysTable actions={actions} />
  </QueryClientProvider>
);

jest.mock(
  '@redhat-cloud-services/frontend-components/Unavailable',
  // eslint-disable-next-line react/display-name
  () => () => <div>Unavailable</div>
);

describe('ActivationKeysTable', () => {
  def('rbacPermissions', () => {
    return {
      rbacPermissions: {
        canReadActivationKeys: true,
        canWriteActivationKeys: true,
      },
    };
  });
  def('loading', () => false);
  def('error', () => false);
  def('data', () => [
    {
      name: 'A',
      role: 'B',
      serviceLevel: 'C',
      usage: 'D',
    },
  ]);

  beforeEach(() => {
    jest
      .spyOn(queryClient, 'getQueryData')
      .mockReturnValue(get('rbacPermissions'));
    useActivationKeys.mockReturnValue({
      isLoading: get('loading'),
      error: get('error'),
      data: get('data'),
    });
  });

  it('renders correctly', () => {
    const { container } = render(<Table />);

    expect(container).toMatchSnapshot();
  });

  it('displays enabled actions', () => {
    render(<Table />);
    const actions = screen.getByLabelText('Actions');
    expect(actions.closest('button')).not.toBeDisabled();
  });

  describe('when loading', () => {
    def('loading', () => true);

    it('renders the loading state', () => {
      const { container } = render(<Table />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('when user does not have write permissions', () => {
    def('rbacPermissions', () => {
      return {
        rbacPermissions: {
          canReadActivationKeys: true,
          canWriteActivationKeys: false,
        },
      };
    });
    it('displays disabled actions', () => {
      render(<Table />);
      const actions = screen.getByLabelText('Actions');
      expect(actions.closest('button')).toBeDisabled();
    });
  });

  describe('when there is an error', () => {
    def('error', () => true);

    it('renders the error state', () => {
      const { container } = render(<Table />);

      expect(container).toMatchSnapshot();
    });
  });
});
