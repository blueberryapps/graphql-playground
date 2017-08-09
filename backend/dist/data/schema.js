'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _graphqlTools = require('graphql-tools');

var _resolvers = require('./resolvers');

// src/schema.js
var typeDefs = '\ntype Channel {\n   id: ID!                # "!" denotes a required field\n   name: String\n}\n# This type specifies the entry points into our API. In this case\n# there is only one - "channels" - which returns a list of channels.\ntype Query {\n   channels: [Channel]    # "[]" means this is a list of channels\n}\n\n# The mutation root type, used to define all mutations.\ntype Mutation {\n  # A mutation to add a new channel to the list of channels\n  addChannel(name: String!): Channel\n}\n';
var schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: _resolvers.resolvers });

// addMockFunctionsToSchema({ schema });
exports.schema = schema;