import { ClipboardCopy, Form, FormGroup } from '@patternfly/react-core';
import React from 'react';

function CopyCommand() {
  return (
    <Form className="pf-u-mt-md" onSubmit={(event) => event.preventDefault()}>
      <FormGroup label="RHC command for registration">
        <ClipboardCopy>
          rhc connect -[activationkey-namehere] -[organization ID]
        </ClipboardCopy>
      </FormGroup>
    </Form>
  );
}

export default CopyCommand;
