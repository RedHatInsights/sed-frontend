import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@patternfly/react-core';
import { useLocation, useHistory } from 'react-router-dom';
import classnames from 'classnames';

import './nav-tabs.scss';

const NavTabs = ({ tabItems, TabsProps: { className, ...TabsProps } }) => {
  const { push } = useHistory();
  const { pathname, search } = useLocation();
  const activeTab = tabItems.find(({ pathname: tabPathname }) =>
    pathname.includes(tabPathname)
  );
  const handleTabClick = (_event, tabIndex) =>
    push({ pathname: tabItems[tabIndex].pathname, search });

  return (
    <Tabs
      {...TabsProps}
      className={classnames('ins-c-navtabs', className)}
      activeKey={activeTab ? activeTab.eventKey : 0}
      onSelect={handleTabClick}
    >
      {tabItems.map((item) => (
        <Tab key={item.eventKey} {...item} />
      ))}
    </Tabs>
  );
};

NavTabs.propTypes = {
  tabItems: PropTypes.arrayOf(
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      eventKey: PropTypes.number.isRequired,
      title: PropTypes.node.isRequired,
    })
  ),
  TabsProps: PropTypes.object,
};

export default NavTabs;
