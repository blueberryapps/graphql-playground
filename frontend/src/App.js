import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
import ChannelsList from './ChannelsList';

import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';


// Your network connection
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:9000/graphql',
});

networkInterface.use([{
  applyMiddleware(req, next) {
    setTimeout(next, 500);
  },
}])



const wsClient = new SubscriptionClient(`ws://localhost:9000/subscriptions`, {
  reconnect: true,
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient,
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});



class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <div className="App">
            <div className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h2>Welcome to Apollo</h2>
            </div>
            <ChannelsList />
          </div>
        </ApolloProvider>
    );
  }
}
export default App;
