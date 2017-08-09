import React from 'react';
import {
  gql,
  graphql
} from 'react-apollo';
import AddChannel from './AddChannel'


export const ChannelsList = ({data: {loading, error, channels = []} = {}}) => {

  console.log(channels)
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return(
      <div>

        <ul>
          <li><AddChannel /></li>
          { channels.map(ch =>  <li key={ch.id}><div className={'channel ' + (ch.id < 0 ? 'optimistic' : '')} key={ch.id}>{ch.name}</div></li>) }
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

export default graphql(channelsListQuery)(ChannelsList);