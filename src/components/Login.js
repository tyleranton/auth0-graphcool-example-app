import React from 'react';
import PropTypes from 'prop-types';
import Auth0Lock from 'auth0-lock';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();

    this._lock = new Auth0Lock('__AUTH0_CLIENT_ID__', '__AUTH0_DOMAIN__');
  }

  static propTypes = {
    history: PropTypes.object.isRequired
  };

  container = {
    marginTop: '100px'
  };

  loginButton = {
    padding: '10px',
    width: '150px',
    background: '#00BFFF',
    color: 'white',
    cursor: 'pointer',
    border: 'none'
  };

  componentDidMount() {
    this._lock.on('authenticated', authResult => {
      window.localStorage.setItem('auth0IdToken', authResult.idToken);
      this.props.history.push('/create');
    });
  }

  login = () => {
    this._lock.show();
  };

  render() {
    return (
      <div style={this.container}>
        <p>Login to get started!</p>
        <button style={this.loginButton} onClick={this.login}>
          Get Started
        </button>
      </div>
    );
  }
}

export default withRouter(Login);
