import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useLocation } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import Loading from '../LoadingState/Loading';
import Unavailable from '@redhat-cloud-services/frontend-components/Unavailable';
import propTypes from 'prop-types';
const Authentication = ({ children }) => {
  const queryClient = useQueryClient();
  const location = useLocation();

  const { isLoading, isFetching, isSuccess, isError } = useUser();

  useEffect(() => {
    isSuccess && window.insights?.chrome?.hideGlobalFilter();
  }, [isSuccess]);

  useEffect(() => {
    /**
     * On every rerender, based on URL change (location.pathname),
     * reset the user's status to loading before authenticating again.
     */
    queryClient.invalidateQueries('user');
  }, [location.pathname]);

  if (isError === true) {
    return <Unavailable />;
  } else if (isLoading === true || isFetching === true) {
    return <Loading />;
  } else if (isSuccess === true) {
    return <>{children}</>;
  }
};

Authentication.propTypes = {
  children: propTypes.object,
};

export default Authentication;
