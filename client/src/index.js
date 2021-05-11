import { WebSocketLink } from '@apollo/client/link/ws';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, split, createHttpLink } from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from './App';
import { constants } from './config/constant';

const httpLink = createHttpLink({
  uri: constants.Gql.baseUrl,
  credentials: 'include',
  includeExtensions: true
});

const wsLink = new WebSocketLink({
  uri: constants.Gql.baseWebSocketUrl,
  options: { reconnect: true },
});

Sentry.init({
  dsn: constants.sentry.dns,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});


const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === constants.Gql.split.kind &&
      definition.operation === constants.Gql.split.subscription
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);