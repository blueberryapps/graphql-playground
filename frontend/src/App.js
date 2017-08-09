import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
import ChannelsList from './ChannelsList';


// Your network connection
const networkInterface = createNetworkInterface({
  uri: 'http://localhost:9000/graphql',
});

const client = new ApolloClient({
  networkInterface,
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
