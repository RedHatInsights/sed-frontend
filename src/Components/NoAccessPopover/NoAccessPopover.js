import React from 'react';
import { Tooltip } from '@patternfly/react-core';
import propTypes from 'prop-types';

const NoAccessPopover = ({ content: Button }) => {
  return (
    <React.Fragment>
      <Tooltip
        position="bottom-start"
        content={<div>For editing access, contact your administrator.</div>}
      >
        <div>
          <Button />
        </div>
      </Tooltip>
    </React.Fragment>
  );
};

export default NoAccessPopover;

NoAccessPopover.propTypes = {
  content: propTypes.elementType.isRequired,
};
