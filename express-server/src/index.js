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

// const cmd = require('node-cmd');

global.appRoot = path.resolve(__dirname);

const PORT = config.app.port;

const app = appManager.setup(config);
const corsOptions = {
  // To allow requests from client
  origin: process.env.api || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
app.use('/api', restRouter);
// app.post('/git', (req, res) => {
//   // If event is "push"
//   if (req.headers['x-github-event'] === 'push') {
//     cmd.run('git pull'); // Refresh project
//     console.log('> [GIT] Updated with origin/master');
// 	  }
//   return res.sendStatus(200); // Send back OK status
// });
// app.use((req, res, next) => {
//   console.log(req.url);
//   next(new RequestError('Invalid route', 404));
// });

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
  graphiql: true/* ,
  context: ({ req }) => {
    return {
      ...req,
      userId:
        req && req.headers.authorization
          ? getUserId(req)
          : null
    };
  } */
}));
global.json = (r)=>{return JSON.parse(JSON.stringify(r))}
/* Start Listening service */
app.listen(PORT, () => {
  kue.init();
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
