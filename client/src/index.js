import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './Apollo';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { Provider } from 'react-redux';
import store from './store/store';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange
  },
  appBar: {
    height: 65
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

