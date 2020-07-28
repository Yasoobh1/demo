import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './container/routes';
import { Provider } from 'react-redux'
import { store } from './store/store';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
      <Router basename="/">
        <AppRouter />
      </Router>
      </Provider>
    )
  }
}

export default App;