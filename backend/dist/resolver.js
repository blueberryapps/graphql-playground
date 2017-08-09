'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// src/resolvers.js
var _channels = [{
  id: 1,
  name: 'soccer'
}, {
  id: 2,
  name: 'baseball'
}];
var resolvers = exports.resolvers = {
  Query: {
    channels: function channels() {
      return _channels;
    }
  }
};