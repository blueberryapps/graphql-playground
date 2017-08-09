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
var nextId = 3;
var resolvers = exports.resolvers = {
  Query: {
    channels: function channels() {
      return _channels;
    }
  },
  Mutation: {
    addChannel: function addChannel(root, args) {
      var newChannel = { id: nextId++, name: args.name };
      _channels.push(newChannel);
      return newChannel;
    }
  }
};