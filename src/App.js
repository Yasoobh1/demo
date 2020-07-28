import React from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './container/routes';
import { Provider } from 'react-redux'
import { store, persistor } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router basename="/">
            <AppRouter />
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;