import React from 'react';
import propTypes from 'prop-types';
import { Tooltip } from '@patternfly/react-core';

const ConditionalTooltip = ({ isVisible, children, ...props }) =>
  isVisible ? <Tooltip {...props}>{children}</Tooltip> : children;

ConditionalTooltip.propTypes = {
  isVisible: propTypes.bool,
  children: propTypes.node,
};

export default ConditionalTooltip;
