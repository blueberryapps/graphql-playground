import bodyParser from 'body-parser';
import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import cors from 'cors';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

import resolvers from './data/resolvers'
import typeDefs from './data/schema';
const schema = makeExecutableSchema({ typeDefs, resolvers });

const PORT = 9000;

const app = express();

app.use('*', cors({ origin: 'http://localhost:3000' }));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphql-explorer', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:9000/subscriptions`
}));

const ws = createServer(app);

ws.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}`);

  // Set up the WebSocket for handling GraphQL subscriptions
  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: ws,
    path: '/subscriptions',
  });
});
