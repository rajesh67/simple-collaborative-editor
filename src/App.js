import React, { Component } from 'react';
import { Provider } from "react-redux";
import Home from './components/Home';

import { Row } from "reactstrap";

import logo from './logo.svg';
import './App.css';

import store from './store';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Row>
        <div className="App offset-md-2 col-md-8">

          <Home />
          </div>
        </Row>

      </Provider>
    );
  }
}

export default App;
