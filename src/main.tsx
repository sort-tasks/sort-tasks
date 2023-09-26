import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import Tasks from 'pages/Tasks';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthenticatorRouter } from './pages/AuthenticatorRouter';
import './index.css';
import { client } from './apolloClient';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ToastContainer />
      <AuthenticatorRouter>
        <Tasks />
      </AuthenticatorRouter>
    </ApolloProvider>
  </React.StrictMode>
);
