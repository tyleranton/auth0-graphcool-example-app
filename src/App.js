import React from 'react';
import PropTypes from 'prop-types';
import Login from './components/Login';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class App extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
  };

  _isLoggedIn = () => {
    return this.props.data.user;
  };

  renderLoggedOut = () => {
    return <Login />;
  };

  renderLoggedIn = () => {
    return <div>Logged in!</div>;
  };

  container = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '200px'
  };

  render() {
    if (this.props.data.loading) <div>Loading...</div>;
    return (
      <div style={this.container}>
        {this._isLoggedIn() ? this.renderLoggedIn() : this.renderLoggedOut()}
      </div>
    );
  }
}

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`;

export default graphql(userQuery, { options: { fetchPolicy: 'network-only' } })(
  withRouter(App)
);
