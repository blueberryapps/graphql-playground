import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';

// mocks


import AddChannel from './AddChannel'

import {
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'graphql-tools';
// import {mockNetworkInterfaceWithSchema} from 'apollo-test-utils';
import {typeDefs} from './schema';
const schema = makeExecutableSchema({typeDefs});
addMockFunctionsToSchema({schema});
// const mockNetworkInterface = mockNetworkInterfaceWithSchema({ schema });

// end mocks

const networkInterface = createNetworkInterface({
  uri: 'http://localhost:9000/graphql',
});

const client = new ApolloClient({
  networkInterface,
});


const ChannelsList = ({data: {loading, error, channels = []} = {}}) => {
  console.log(loading, error, channels)
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return(
      <div>
      <AddChannel />
        <ul>
          { channels.map(ch =>  <li><div className={'channel ' + (ch.id < 0 ? 'optimistic' : '')} key={ch.id}>{ch.name}</div></li>) }
        </ul>
      </div>
  );
};

export const channelsListQuery = gql`
   query ChannelsListQuery {
     channels {
       id
       name
     }
   }
 `;
const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);


class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h2>Welcome to Apollo</h2>
            </div>
            <ChannelsListWithData />
          </div>
        </ApolloProvider>
    );
  }
}
export default App;
