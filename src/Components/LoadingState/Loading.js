import React from 'react';
import { Bullseye, Spinner } from '@patternfly/react-core';

const Loading = () => {
  return (
    <Bullseye>
      <Spinner />
    </Bullseye>
  );
};

export default Loading;
