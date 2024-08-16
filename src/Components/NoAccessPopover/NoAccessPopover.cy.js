import React from 'react';
import NoAccessPopover from './NoAccessPopover';
import { Button } from '@patternfly/react-core';

describe('NoAccessPopover component', () => {
  it('renders with button component passes as a prop', () => {
    cy.mount(<NoAccessPopover content={() => <Button>Button text</Button>} />);

    cy.get('.pf-v5-c-button').contains('Button text');
    cy.get('.pf-v5-c-button').trigger('mouseenter');
    cy.get('.pf-v5-c-tooltip__content').contains(
      'For editing access, contact your administrator.'
    );
  });
});
