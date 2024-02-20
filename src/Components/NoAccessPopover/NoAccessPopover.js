import React from 'react';
import { Tooltip } from '@patternfly/react-core';
import propTypes from 'prop-types';

const NoAccessPopover = ({ content: Button }) => {
  return (
    <React.Fragment>
      <Tooltip
        content={<div>For editing access, contact your administrator.</div>}
      >
        <div className="pf-v5-u-display-inline-block">
          <Button />
        </div>
      </Tooltip>
    </React.Fragment>
  );
};

NoAccessPopover.propTypes = {
  content: propTypes.elementType.isRequired,
};

export default NoAccessPopover;
