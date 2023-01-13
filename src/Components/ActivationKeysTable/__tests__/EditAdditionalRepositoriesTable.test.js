import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render, screen } from '@testing-library/react';
import ActivationKeysTable from '../ActivationKeysTable';
import useAvailableRepositories from '../../../hooks/useAvailableRepositories';
import { get, def } from 'bdd-lazy-var';
import '@testing-library/jest-dom';
import useFeatureFlag from '../../../hooks/useFeatureFlag';

jest.mock('../../../hooks/useAvailableRepositories');

const queryClient = new QueryClient();

