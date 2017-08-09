// src/resolvers.js
import { PubSub } from 'graphql-subscriptions';

const channels = [{
  id: 1,
  name: 'soccer',
}, {
  id: 2,
  name: 'baseball',
}];

let nextId = 3;

const pubsub = new PubSub();
const resolvers = {
  Query: {
    channels: () => channels,
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: nextId++, name: args.name }; // eslint-disable-line
      channels.push(newChannel);
      pubsub.publish('channelAdded', { channelAdded: { ...newChannel } });
      return newChannel;
    },
  },
  Subscription: {
    channelAdded: {
      subscribe: () => pubsub.asyncIterator('channelAdded'),
    },
  },

};

export default resolvers;
