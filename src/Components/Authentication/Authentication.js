import React, { useEffect } from 'react';
import useUser from '../../hooks/useUser';
import Loading from '../LoadingState/Loading';
import Unavailable from '@redhat-cloud-services/frontend-components/Unavailable';
import propTypes from 'prop-types';
import useChrome from '@redhat-cloud-services/frontend-components/useChrome';
import NotAuthorized from '@redhat-cloud-services/frontend-components/NotAuthorized';

const Authentication = ({ children }) => {
  const chrome = useChrome();
  const { isLoading, isFetching, isSuccess, isError, data } = useUser();
  const hasPermissions =
    data?.rbacPermissions && data.rbacPermissions.canReadConfigManagerProfile;

  useEffect(() => {
    isSuccess && chrome?.hideGlobalFilter();
  }, [isSuccess]);

  if (isError === true) {
    return <Unavailable />;
  } else if (isLoading === true || isFetching === true) {
    return <Loading />;
  } else if (isSuccess === true && !hasPermissions) {
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
