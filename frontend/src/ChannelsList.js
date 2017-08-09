import React, { Component } from 'react';
// import {
//   gql,
//   graphql,
//   compose,
// } from 'react-apollo';
import PropTypes from 'prop-types';
import AddChannel from './AddChannel';

export class ChannelsListComponent extends Component {
  componentWillMount() {

  }

  render() {
    const { data: { loading, error, channels = [] } = { channels: [] } } = this.props;

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
  data: PropTypes.Object,
};

export default ChannelsListComponent;
