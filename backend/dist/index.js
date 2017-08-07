'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _apolloServerExpress = require('apollo-server-express');

var _schema = require('./data/schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = 9000;

var app = (0, _express2.default)();

// bodyParser is needed just for POST.
app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({ schema: _schema2.default }));

// GraphQL Explorer
app.use('/graphql-explorer', (0, _expressGraphql2.default)({
  schema: _schema2.default,
  graphiql: true
}));

app.listen(PORT);