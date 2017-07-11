import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import CreateUser from './components/CreateUser';
import registerServiceWorker from './registerServiceWorker';
import {
  ApolloProvider,
  ApolloClient,
  createNetworkInterface
} from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: '__GRAPHCOOL_API_ENDPOINT__'
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}; // Create the header object if needed.
      }
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('auth0IdToken');
      req.options.headers.authorization = token ? `Bearer ${token}` : null;
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface
});

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center'
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <div style={container}>
        <Route exact path="/" component={App} />
        <Route path="/create" component={CreateUser} />
      </div>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
