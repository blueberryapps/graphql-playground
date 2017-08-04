import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} from 'graphql-tools';

import casual from 'casual';

const mocks = {
  String: () => 'It works!',
  Query: () => ({
    author: (root, args) => ({ firstName: args.firstName, lastName: args.lastName }),
  }),
  Author: () => ({ firstName: () => casual.first_name, lastName: () => casual.last_name }),
  Post: () => ({ title: casual.title, text: casual.sentences(3) }),
};


const typeDefs = `
type Query {
  testString: String
}
`;

const schema = makeExecutableSchema({ typeDefs });

addMockFunctionsToSchema({ schema, mocks });

export default schema;
