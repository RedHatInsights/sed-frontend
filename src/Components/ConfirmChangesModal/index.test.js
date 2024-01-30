import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfirmChangesModal from '.';

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
      <ConfirmChangesModal
        isOpen
        systemsCount={2}
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    );
    expect(screen.getByText('View playbook')).toBeInTheDocument();
    expect(screen.getAllByText('Confirm changes')).toHaveLength(2);
    expect(screen.getAllByText('Confirm changes')[0]).toBeInTheDocument();
  });
});
