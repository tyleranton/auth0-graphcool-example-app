import React from 'react';
import PropTypes from 'prop-types';
import Login from './components/Login';
import { graphql, gql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PostsContainer from './components/PostsContainer';

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
    return <PostsContainer />;
  };

  container = {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '200px',
    width: '100%',
    height: '100%'
  };

  render() {
    if (this.props.data.loading) return <div>Loading...</div>;
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
