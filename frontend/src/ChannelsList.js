import React, { Component } from 'react';
import {
  gql,
  graphql,
  compose,
} from 'react-apollo';
import AddChannel from './AddChannel';


export const channelsListQuery = gql`
   query ChannelsListQuery {
     channels {
       id
       name
     }
   }
 `;

const channelSubscription = gql`
  subscription{
    channelAdded{
      name,
      id
    }
  }`;

export class ChannelsListComponent extends Component {
  componentWillMount() {
    this.props.data.subscribeToMore({
      document: channelSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) {
          return prev;
        }

        const newChannel = subscriptionData.data.channelAdded;

        if (!prev.channels.find(channel => channel.id === newChannel.id)) {
          return {
            ...prev,
            channels: [...prev.channels, newChannel],
          };
        }
        return prev;
      },
    });
  }

  render() {
    const { data: { loading, error, channels = [] } = {} } = this.props;

    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
    return (
      <div>

        <ul>
          <li><AddChannel /></li>
          { channels.map(ch => <li key={ch.id}><div className={`channel ${ch.id < 0 ? 'optimistic' : ''}`} key={ch.id}>{ch.name}</div></li>) }
        </ul>
      </div>
    );
  }
}

ChannelsListComponent.propTypes = {
  data: React.PropTypes.Shape({
    subscribeToMore: React.PropTypes.function.isRequired,
  }).isRequired,
};

export default compose(
  graphql(channelsListQuery),
  // compose is useful when you have more graphql queries
)(ChannelsListComponent);
