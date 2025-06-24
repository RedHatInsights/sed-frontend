import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmChangesModal from '.';
import { BrowserRouter } from 'react-router-dom';

jest.mock(
  '@redhat-cloud-services/frontend-components-utilities/interceptors',
  () => ({
    __esModule: true,
    useAxiosWithPlatformInterceptors: () => require('axios'),
  })
);

describe('ConfirmChangesModal', () => {
  it('renders correctly', () => {
    const handleCancel = jest.fn();
    const handleConfirm = jest.fn();
    render(
      <BrowserRouter>
        <ConfirmChangesModal
          isOpen
          systemsCount={2}
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
        />
      </BrowserRouter>
    );
    expect(screen.getAllByText('Confirm change')).toHaveLength(2);
    expect(screen.getAllByText('Confirm change')[0]).toBeInTheDocument();
  });
});
