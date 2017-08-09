const typeDefs = `
type Channel {
  id: ID!
  name: String
}

type Query {
  channels: [Channel]
}

type Mutation {
  addChannel(name: String!): Channel
}

type Message {
  id: ID!
  text: String
}

type Subscription {
  channelAdded: Channel
}
`;

export default typeDefs;
