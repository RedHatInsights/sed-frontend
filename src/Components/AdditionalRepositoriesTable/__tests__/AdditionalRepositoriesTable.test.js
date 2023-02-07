import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import AdditionalRepositoriesTable from '../AdditionalRepositoriesTable';

jest.mock('../../../hooks/useFeatureFlag');
import '@testing-library/jest-dom';

const queryClient = new QueryClient();

describe('AdditionalRepositoriesTable', () => {
  const repositories = [
    {
      repositoryLabel: 'label-a',
    },
    {
      repositoryLabel: 'label-b',
    },
  ];
  it('renders correctly', () => {
    const Table = () => (
      <QueryClientProvider client={queryClient}>
        <AdditionalRepositoriesTable repositories={repositories} />
      </QueryClientProvider>
    );

    const { container } = render(<Table />);

    expect(container).toMatchSnapshot();
  });
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
  const repositories = [...Array(12)].map(id => 
    ({repositoryLabel: `label-${id}`})
    );
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
    const perPageArrow = screen.getAllByLabelText('Items per page')[0];
    fireEvent.click(perPageArrow);
    const perPageAmout = screen.getByText('20 per page');
    fireEvent.click(perPageAmout);

    expect(container).toMatchSnapshot();
  });
});
