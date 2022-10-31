import React from 'react';
import { Button, Popover, PopoverPosition } from '@patternfly/react-core';
import propTypes from 'prop-types';
import { OutlinedQuestionCircleIcon } from '@patternfly/react-icons';

const ActivationKeysDocsPopover = (props) => {
  const { title, popoverContent, position } = props;
  const positions = {
    right: PopoverPosition.rightStart,
    left: PopoverPosition.leftStart,
    top: PopoverPosition.top,
    bottom: PopoverPosition.bottom,
  };
  return (
    <Popover
      headerContent={title}
      position={positions[position]}
      className="connector pf-u-color-100"
      bodyContent={popoverContent}
    >
      <Button variant="plain" isInline style={{ padding: 0 }}>
        <OutlinedQuestionCircleIcon />
      </Button>
    </Popover>
  );
};

export default ActivationKeysDocsPopover;

ActivationKeysDocsPopover.propTypes = {
  popoverContent: propTypes.object,
  title: propTypes.string,
  position: propTypes.string,
};
