import React, { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import Loading from '../LoadingState/Loading';
import Unavailable from '@redhat-cloud-services/frontend-components/Unavailable';
import propTypes from 'prop-types';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import NotAuthorized from '@redhat-cloud-services/frontend-components/NotAuthorized';
import { usePermissionsWithContext } from '@redhat-cloud-services/frontend-components-utilities/RBACHook';

const Authentication = ({ children }) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const chrome = useChrome();
  const { isLoading, isFetching, isSuccess, isError } = useUser();

  console.log(">>> All permissions:", chrome.getUserPermissions('config-manager'));

  const { hasAccess: hasAnyPermission } = usePermissionsWithContext([
    'config-manager:activation_keys:write',
  ]);

  console.log(">>> usePermissionsWithContext indicates having config-manager:activation_keys:write", hasAnyPermission);

  useEffect(() => {
    isSuccess && chrome?.hideGlobalFilter();
  }, [isSuccess]);

  useEffect(() => {
    /**
     * On every rerender, based on URL change (location.pathname),
     * reset the user's status to loading before authenticating again.
     */
    queryClient.invalidateQueries(['user']);
  }, [location.pathname]);

  if (isError === true) {
    return <Unavailable />;
  } else if (isLoading === true || isFetching === true) {
    return <Loading />;
  } else if (isSuccess === true && !hasAnyPermission) {
    return <NotAuthorized serviceName="Remote Host Configuration" />;
  } else if (isSuccess === true) {
    return <>{children}</>;
  } else {
    return <Loading />;
  }
};

Authentication.propTypes = {
  children: propTypes.node,
};

export default Authentication;
