import React from 'react';
import { ApolloProvider } from '@apollo/client';
import Tasks from 'pages/Tasks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthenticatorRouter } from './pages/AuthenticatorRouter';
import './index.css';
import { client } from './apolloClient';

export const App = () => {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <ToastContainer />
        <AuthenticatorRouter>
          <React.Fragment>
            <Tasks />
          </React.Fragment>
        </AuthenticatorRouter>
      </ApolloProvider>
    </React.StrictMode>
  );
};
