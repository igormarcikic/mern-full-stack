import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './Apollo';
import App from './App';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: deepOrange
  },
  appBar: {
    height: 65
  }
});

console.log(theme)

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

