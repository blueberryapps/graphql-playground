import bodyParser from 'body-parser';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { graphqlExpress } from 'apollo-server-express';
import cors from 'cors';

import {schema} from './data/schema';

const PORT = 9000;

const app = express();

app.use('*', cors({ origin: 'http://localhost:3000' }));

// bodyParser is needed just for POST.
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphQL Explorer
app.use('/graphql-explorer', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
});
