import { render } from '@testing-library/react';
import ConfirmChangesModal from '.';
import React from 'react';

describe('ConfirmChangesModal', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <ConfirmChangesModal isOpen systemsCount={2} />
    );
    expect(getByText('Confirm changes')).toBeInTheDocument();
  });
});
