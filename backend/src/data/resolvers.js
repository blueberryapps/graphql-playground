// src/resolvers.js
import {PubSub, withFilter} from 'graphql-subscriptions';

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
        channels: () => {
          return channels;
        },
      },
      Mutation: {
        addChannel: (root, args) => {
          const newChannel = {id: nextId++, name: args.name};
          channels.push(newChannel);
          console.log('ADDING')

          pubsub.publish('channelAdded', {channelAdded: {...newChannel}});
          return newChannel;
        },
      },
      Subscription: {
        channelAdded: {
          subscribe: () => {
            return pubsub.asyncIterator('channelAdded')
          }
        }
      }

    };

export default resolvers;
