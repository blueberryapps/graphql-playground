import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { graphqlExpress } from 'apollo-server-express';

import myGraphQLSchema from './data/schema';

const PORT = 9000;

const app = express();

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));

// GraphQL Explorer
app.use('/graphql-explorer', graphqlHTTP({
  schema: myGraphQLSchema,
  graphiql: true,
}));

app.listen(PORT);
