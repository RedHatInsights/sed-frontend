import { mount } from '@cypress/react';
import React from 'react';
import ConfirmChangesModal from '.';

describe('ConfirmChangesModal', () => {
  beforeEach(() => {
    mount(<ConfirmChangesModal isOpen systemsCount={2} />);
  });

  it('renders correctly', () => {
    cy.get('.pf-c-modal-box')
      .find('.pf-c-modal-box__title-text')
      .should('have.text', 'Confirm changes');
  });
});
