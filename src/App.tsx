import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { client } from 'apolloClient';
import { AuthenticatorRouter } from 'pages/AuthenticatorRouter';
import Tasks from 'pages/Tasks';

import './index.css';

export const App = () => {
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <ToastContainer />
        <AuthenticatorRouter>
          <Tasks />
        </AuthenticatorRouter>
      </ApolloProvider>
    </React.StrictMode>
  );
};
