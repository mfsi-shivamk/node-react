/* eslint-disable no-param-reassign */
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { graphqlHTTP } from 'express-graphql';
import { PubSub } from 'graphql-subscriptions';
import { execute, subscribe } from 'graphql';
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import schema from './schema/schema';
import { restRouter } from './api';
import { jwtStrategy } from './middleware/strategy';

import CustomErrors from './CustomErrors.json';
import config from './config';
import appManager from './app';
import './errors';
import './passport';

const expressGraphQL = graphqlHTTP;

Sentry.init({
  dsn: config.app.sentryUrl,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

global.appRoot = path.resolve(__dirname);

const PORT = config.app.port;
const SOCKET = config.app.scoket;
const CLIENT_URL = config.app.client;

const app = appManager.setup(config);

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true
};

app.use(cors(corsOptions));
app.use('/api', restRouter);

app.use(Sentry.Handlers.errorHandler());

app.use((error, req, res, next) => {
  if (!(error instanceof RequestError)) {
    error = new RequestError('Some Error Occurred', 500, error.message);
  }
  error.status = error.status || 500;
  res.status(error.status);
  const contype = req.headers['content-type'];
  const json = !(!contype || contype.indexOf('application/json') !== 0);
  if (json) {
    return res.json({ errors: error.errorList });
  }
  return res.json({ errors: [error.message] });
});
app.use(jwtStrategy);
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
  subscriptionsEndpoint: `${SOCKET}:${PORT}/subscriptions`,
  customFormatErrorFn: error => CustomErrors[error.message]
}));
global.json = r => JSON.parse(JSON.stringify(r));

global.pubSub = new PubSub();

const { createServer } = require('http');


const webServer = createServer(app);

webServer.listen(PORT, () => {
  console.log(`GraphQL is now running on PORT:${PORT}`);
  // eslint-disable-next-line no-new
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: webServer,
    path: '/subscriptions',
  });
});
