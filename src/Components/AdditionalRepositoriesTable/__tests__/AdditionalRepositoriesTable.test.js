import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import AdditionalRepositoriesTable from '../AdditionalRepositoriesTable';
import { get, def } from 'bdd-lazy-var';
import '@testing-library/jest-dom';
import useAvailableRepositories from '../../../hooks/useAvailableRepositories';
jest.mock('../../../hooks/useAvailableRepositories');
jest.mock('uuid', () => {
  return { v4: jest.fn(() => '00000000-0000-0000-0000-000000000000') };
});
jest.mock('../../../hooks/useUser');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteMatch: () => ({ url: '/' }),
}));

const queryClient = new QueryClient();

describe('AdditionalRepositoriesTable', () => {
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
    useAvailableRepositories.mockReturnValue({
      isLoading: get('loading'),
      error: get('error'),
      data: get('data'),
    });
  });
  const repositories = [
    {
      repositoryLabel: 'label-a',
    },
    {
      repositoryLabel: 'label-b',
    },
  ];

  jest.mock('../../../hooks/useUser', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue({
      isLoading: false,
      isFetching: false,
      isSuccess: true,
      isError: false,
      data: {
        rbacPermissions: {
          canReadActivationKeys: true,
          canWriteActivationKeys: true,
        },
      },
    }),
  }));

  it('renders correctly', () => {
    const Table = () => (
      <QueryClientProvider client={queryClient}>
        <AdditionalRepositoriesTable repositories={repositories} />
      </QueryClientProvider>
    );

    const { container } = render(<Table />);

    expect(container).toMatchSnapshot();
  });

  describe('when row column headings are clicked', () => {
    const repositories = [
      {
        repositoryLabel: 'label-a',
      },
      {
        repositoryLabel: 'label-b',
      },
      {
        repositoryLabel: 'label-c',
      },
    ];

    it('can sort by name', () => {
      const Table = () => (
        <QueryClientProvider client={queryClient}>
          <AdditionalRepositoriesTable repositories={repositories} />
        </QueryClientProvider>
      );

      const { container } = render(<Table />);
      fireEvent.click(screen.getByText('Name'));

      expect(container).toMatchSnapshot();
    });

    it('can sort by name, reversed', () => {
      const Table = () => (
        <QueryClientProvider client={queryClient}>
          <AdditionalRepositoriesTable repositories={repositories} />
        </QueryClientProvider>
      );

      const { container } = render(<Table />);
      fireEvent.click(screen.getByText('Name'));
      fireEvent.click(screen.getByText('Name'));

      expect(container).toMatchSnapshot();
    });

    it('can sort by label', () => {
      const Table = () => (
        <QueryClientProvider client={queryClient}>
          <AdditionalRepositoriesTable repositories={repositories} />
        </QueryClientProvider>
      );

      const { container } = render(<Table />);
      fireEvent.click(screen.getByText('Label'));

      expect(container).toMatchSnapshot();
    });

    it('can sort by label, reversed', () => {
      const Table = () => (
        <QueryClientProvider client={queryClient}>
          <AdditionalRepositoriesTable repositories={repositories} />
        </QueryClientProvider>
      );

      const { container } = render(<Table />);
      fireEvent.click(screen.getByText('Label'));
      fireEvent.click(screen.getByText('Label'));

      expect(container).toMatchSnapshot();
    });
  });

  describe('when using pagination', () => {
    const repositories = [...Array(12).keys()].map((id) => ({
      repositoryLabel: `label-${id}`,
    }));
    it('can change page', () => {
      const Table = () => (
        <QueryClientProvider client={queryClient}>
          <AdditionalRepositoriesTable repositories={repositories} />
        </QueryClientProvider>
      );

      const { container } = render(<Table />);
      const nextPage = screen.getAllByLabelText('Go to next page')[0];
      fireEvent.click(nextPage);

      expect(container).toMatchSnapshot();
    });
    it('can change per page', () => {
      const Table = () => (
        <QueryClientProvider client={queryClient}>
          <AdditionalRepositoriesTable repositories={repositories} />
        </QueryClientProvider>
      );

      const { container } = render(<Table />);
      const PaginationTop = screen.getByLabelText('pagination-top');
      const arrowIcon = PaginationTop.children[1].firstChild.children[1];
      fireEvent.click(arrowIcon);
      const perPageAmout = screen.getByText('20 per page');
      fireEvent.click(perPageAmout);

      expect(container).toMatchSnapshot();
    });
  });
});
