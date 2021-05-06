import { SubscriptionServer } from 'subscriptions-transport-ws';
const expressGraphQL = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
import path from 'path';
import 'dotenv/config';
import cors from 'cors';
import { restRouter } from './api';
import config from './config';
import appManager from './app';
import './errors';
import kue from './kue';
import './passport';
import { jwtStrategy } from './middleware/strategy';
import { PubSub } from 'graphql-subscriptions';
import { execute, subscribe } from "graphql";

// const cmd = require('node-cmd');

global.appRoot = path.resolve(__dirname);

const PORT = config.app.port;

const app = appManager.setup(config);
const corsOptions = {
  origin: process.env.api || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
app.use('/api', restRouter);

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
	  console.log(error);
  return res.json({ errors: [error.message] });
});
app.use(jwtStrategy);
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
  subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
}));
global.json = (r)=>{return JSON.parse(JSON.stringify(r))}
global.pubSub = new PubSub();

const { createServer } = require("http");
const webServer = createServer(app);
webServer.listen(PORT, () => {
  console.log(`GraphQL is now running on http://localhost:${PORT}`);
  new SubscriptionServer({
      execute,
      subscribe,
      schema
  }, {
      server: webServer,
      path: '/subscriptions',
  });
});
