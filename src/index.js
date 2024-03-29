import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';
import './index.css';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import persistState from 'redux-sessionstorage';
import App from './App';
import rootReducer from './reducers';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://it2810-16.idi.ntnu.no:4000/graphql',
});

const client = new ApolloClient({
  cache,
  link,
});

const createPersistentStore = compose(
  persistState(),
)(createStore);

const store = createPersistentStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>, document.getElementById('root'),
);
