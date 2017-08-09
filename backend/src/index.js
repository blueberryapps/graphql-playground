import bodyParser from 'body-parser';
import express from 'express';
import {
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
// import graphqlHTTP from 'express-graphql';
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

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// // GraphQL Explorer
// app.use('/graphql-explorer', graphqlHTTP({
//   schema,
//   graphiql: true,
// }));

app.use('/graphql-explorer', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:9000/subscriptions`
}));


//
//
//
// server.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
//   subscriptionsEndpoint: `ws://localhost:4000/subscriptions`
// }));

// We wrap the express server so that we can attach the WebSocket for subscriptions
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

// app.listen(PORT, () => {
//   console.log(`Server is listening on http://localhost:${PORT}`); // eslint-disable-line no-console
// });
