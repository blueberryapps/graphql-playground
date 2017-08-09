import React from 'react';
import { gql, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import { channelsListQuery } from './ChannelsList';

const AddChannel = ({ mutate }) => {
  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      evt.persist();
      mutate({
        variables: { name: evt.target.value },
        optimisticResponse: {
          addChannel: {
            name: evt.target.value,
            id: Math.round(Math.random() * -1000000),
            __typename: 'Channel',
          },
        },
        update: (store, { data: { addChannel } }) => {
          // Read the data from the cache for this query.
          const data = store.readQuery({ query: channelsListQuery });
          // Add our channel from the mutation to the end.
          data.channels.push(addChannel);
          // Write the data back to the cache.
          store.writeQuery({ query: channelsListQuery, data });
        },
      })
        .then(() => {
          evt.target.value = ''; // eslint-disable-line
        });
    }
  };


  AddChannel.propTypes = {
    mutate: PropTypes.function.isRequired,
  };
  return (
    <input
      type="text"
      placeholder="New channel"
      onKeyUp={handleKeyUp}
    />
  );
};
const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;
const AddChannelWithMutation = graphql(
  addChannelMutation,
)(AddChannel);
export default AddChannelWithMutation;
